/**
 * Copyright © 1998 - 2020 Tencent. All Rights Reserved.
 *
 * @author enoyao
 */

import { successMessage, errorMessage, empty, loader } from '../util';
import * as vscode from "vscode";
const pug = require("pug");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");

export const pugLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    try {
        const html = selectedText ? pug.compile(selectedText, { pretty: true })() : pug.renderFile(fileName, { pretty: true });
        src(fileName)
            .pipe(empty(html))
            .pipe(rename({ extname: ".html" }))
            .pipe(dest(outputPath));
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }

    if (compileOptions.generateMinifiedHtml) {
        const html = selectedText ? pug.compile(selectedText)() : pug.renderFile(fileName);
        src(fileName)
            .pipe(empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}