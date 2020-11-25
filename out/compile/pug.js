"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pugLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const pug = require("pug");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");
exports.pugLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }) => {
    try {
        const html = selectedText ? pug.compile(selectedText, { pretty: true })() : pug.renderFile(fileName, { pretty: true });
        src(fileName)
            .pipe(util_1.empty(html))
            .pipe(rename({ extname: ".html" }))
            .pipe(dest(outputPath));
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
    if (compileOptions.generateMinifiedHtml) {
        const html = selectedText ? pug.compile(selectedText)() : pug.renderFile(fileName);
        src(fileName)
            .pipe(util_1.empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(util_1.successMessage);
};
//# sourceMappingURL=pug.js.map