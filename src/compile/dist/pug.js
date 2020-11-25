"use strict";
exports.__esModule = true;
exports.pugLoader = void 0;
var util_1 = require("../util");
var vscode = require("vscode");
var pug = require("pug");
var _a = require("gulp"), src = _a.src, dest = _a.dest;
var rename = require("gulp-rename");
exports.pugLoader = function (_a) {
    var fileName = _a.fileName, outputPath = _a.outputPath, notificationStatus = _a.notificationStatus, compileOptions = _a.compileOptions, selectedText = _a.selectedText;
    var html = "";
    try {
        html = pug.renderFile(fileName, { pretty: true });
        var fn = pug.compile(selectedText, { pretty: true });
        html = selectedText ? fn() : html;
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
        html = pug.renderFile(fileName);
        var fn = pug.compile(selectedText);
        html = selectedText ? fn() : html;
        src(fileName)
            .pipe(util_1.empty(html))
            .pipe(rename({ suffix: ".min", extname: ".html" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(util_1.successMessage);
};
