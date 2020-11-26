"use strict";
/**
 * Copyright © 1998 - 2020 Tencent. All Rights Reserved.
 *
 * @author enoyao
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.jadeLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const jade = require("jade");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");
exports.jadeLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }) => {
    let html = "";
    try {
        html = selectedText ? jade.compile(selectedText, { pretty: true })() : jade.renderFile(fileName, { pretty: true });
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
    src(fileName)
        .pipe(util_1.empty(html))
        .pipe(rename({ extname: ".html" }))
        .pipe(dest(outputPath));
    if (compileOptions.generateMinifiedHtml) {
        html = selectedText ? jade.compile(selectedText)() : jade.renderFile(fileName);
        src(fileName)
            .pipe(util_1.empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(util_1.successMessage);
};
//# sourceMappingURL=jade.js.map