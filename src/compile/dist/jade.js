"use strict";
exports.__esModule = true;
exports.jadeLoader = void 0;
var util_1 = require("../util");
var vscode = require("vscode");
var jade = require("jade");
var _a = require("gulp"), src = _a.src, dest = _a.dest;
var rename = require("gulp-rename");
exports.jadeLoader = function (_a) {
    var fileName = _a.fileName, outputPath = _a.outputPath, notificationStatus = _a.notificationStatus, compileOptions = _a.compileOptions, selectedText = _a.selectedText;
    var html = "";
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
