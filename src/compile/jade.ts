import { successMessage, errorMessage, loader } from '../util';
import * as vscode from "vscode";
const jade = require("gulp-jade");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const jadeLoader = ({ fileName, outputPath, notificationStatus, compileOptions }: loader) => {
    src(fileName)
        .pipe(
            jade({
                pretty: true,
            }).on("error", (error: any) => {
                notificationStatus && vscode.window.showErrorMessage(error.message);
                vscode.window.setStatusBarMessage(errorMessage);
            })
        )
        .pipe(dest(outputPath));
    if (compileOptions.generateMinifiedHtml) {
        src(fileName)
            .pipe(
                jade().on("error", (error: any) => {
                    notificationStatus && vscode.window.showErrorMessage(error.message);
                    vscode.window.setStatusBarMessage(errorMessage);
                })
            )
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}