import { successMessage, errorMessage, empty, loader } from '../util';
import * as vscode from "vscode";
const pug = require("pug");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const pugLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    let html = "";
    try {
        html = pug.renderFile(fileName, { pretty: true });
        const fn = pug.compile(selectedText, { pretty: true });
        html = selectedText ? fn() : html;
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }
    src(fileName)
        .pipe(empty(html))
        .pipe(rename({ extname: ".html" }))
        .pipe(dest(outputPath));

    if (compileOptions.generateMinifiedHtml) {
        html = pug.renderFile(fileName);
        const fn = pug.compile(selectedText);
        html = selectedText ? fn() : html;
        src(fileName)
            .pipe(empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}