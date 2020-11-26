/**
 * Copyright © 1998 - 2020 Tencent. All Rights Reserved.
 *
 * @author enoyao
 */

import { successMessage, errorMessage, loader, empty } from '../util';
import * as vscode from "vscode";
const jade = require("jade");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const jadeLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    let html = "";
    try {
        html = selectedText ? jade.compile(selectedText, { pretty: true })() : jade.renderFile(fileName, { pretty: true });
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }

    src(fileName)
        .pipe(empty(html))
        .pipe(rename({ extname: ".html" }))
        .pipe(dest(outputPath));

    if (compileOptions.generateMinifiedHtml) {
        html = selectedText ? jade.compile(selectedText)() : jade.renderFile(fileName);
        src(fileName)
            .pipe(empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}