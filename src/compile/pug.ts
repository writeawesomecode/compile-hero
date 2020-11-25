import { successMessage, errorMessage, empty, loader } from '../util';
import * as vscode from "vscode";
const pug = require("pug");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const pugLoader = ({ fileName, outputPath, notificationStatus, compileOptions }: loader) => {
    let html = "";
    try {
        html = pug.renderFile(fileName, {
            pretty: true,
        });
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }
    if (compileOptions.generateMinifiedHtml) {
        src(fileName)
            .pipe(empty(html))
            .pipe(
                rename({
                    extname: ".html",
                })
            )
            .pipe(dest(outputPath))
            .pipe(empty(pug.renderFile(fileName)))
            .pipe(
                rename({
                    suffix: ".min",
                    extname: ".html",
                })
            )
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}