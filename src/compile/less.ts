import { successMessage, errorMessage, loader, readFileContext, empty } from '../util';
import * as vscode from "vscode";
const cssmin = require("gulp-minify-css");
const { src, dest } = require("gulp");
const less = require("less");
const rename = require("gulp-rename");

export const lessLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    try {
        let css = "";
        const lessText = readFileContext(fileName);
        less.render(selectedText || lessText).then((output: any) => {
            css = output.css;

            src(fileName)
                .pipe(empty(css))
                .pipe(rename({ extname: ".css" }))
                .pipe(dest(outputPath))
                .on("end", () => {
                    vscode.window.setStatusBarMessage(successMessage);
                });

            if (compileOptions.generateMinifiedCss) {
                src(fileName)
                    .pipe(empty(css))
                    .pipe(cssmin({ compatibility: "ie7" }))
                    .pipe(rename({ suffix: ".min", extname: ".css" }))
                    .pipe(dest(outputPath))
                    .on("end", () => {
                        vscode.window.setStatusBarMessage(successMessage);
                    });
            }
        }).catch((error: any) => {
            const message = error.message + ' in file ' + error.filename + ' line no. ' + error.line;
            notificationStatus && vscode.window.showErrorMessage(message);
            vscode.window.setStatusBarMessage(errorMessage);
        });
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }
}