import { successMessage, errorMessage, loader } from '../util';
import * as vscode from "vscode";
const cssmin = require("gulp-minify-css");
const { src, dest } = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");

export const lessLoader = ({ fileName, outputPath, notificationStatus, compileOptions }: loader) => {
    src(fileName)
        .pipe(
            less().on("error", (error: any) => {
                notificationStatus && vscode.window.showErrorMessage(error.message);
                vscode.window.setStatusBarMessage(errorMessage);
            })
        )
        .pipe(dest(outputPath))
        .pipe(dest(outputPath))
        .on("end", () => {
            vscode.window.setStatusBarMessage(successMessage);
        });

    if (compileOptions.generateMinifiedCss) {
        src(fileName)
            .pipe(
                less().on("error", (error: any) => {
                    notificationStatus && vscode.window.showErrorMessage(error.message);
                    vscode.window.setStatusBarMessage(errorMessage);
                })
            )
            .pipe(dest(outputPath))
            .pipe(cssmin({ compatibility: "ie7" }))
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(outputPath))
            .on("end", () => {
                vscode.window.setStatusBarMessage(successMessage);
            });
    }
}