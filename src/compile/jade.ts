import { successMessage, errorMessage, loader, empty } from '../util';
import * as vscode from "vscode";
const jade = require("jade");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const jadeLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    let html = "";
    try {
        html = jade.renderFile(fileName, { pretty: true });
        const fn = jade.compile(selectedText, { pretty: true });
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
        html = jade.renderFile(fileName);
        const fn = jade.compile(selectedText);
        html = selectedText ? fn() : html;
        src(fileName)
            .pipe(empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}