"use strict";
exports.__esModule = true;
exports.lessLoader = void 0;
var util_1 = require("../util");
var vscode = require("vscode");
var cssmin = require("gulp-minify-css");
var _a = require("gulp"), src = _a.src, dest = _a.dest;
var less = require("less");
var rename = require("gulp-rename");
exports.lessLoader = function (_a) {
    var fileName = _a.fileName, outputPath = _a.outputPath, notificationStatus = _a.notificationStatus, compileOptions = _a.compileOptions, selectedText = _a.selectedText;
    try {
        var css_1 = "";
        less.render(selectedText || util_1.readFileContext(fileName)).then(function (output) {
            css_1 = output.css;
            src(fileName)
                .pipe(util_1.empty(css_1))
                .pipe(rename({ extname: ".css" }))
                .pipe(dest(outputPath))
                .on("end", function () {
                vscode.window.setStatusBarMessage(util_1.successMessage);
            });
            if (compileOptions.generateMinifiedCss) {
                src(fileName)
                    .pipe(util_1.empty(css_1))
                    .pipe(cssmin({ compatibility: "ie7" }))
                    .pipe(rename({ suffix: ".min", extname: ".css" }))
                    .pipe(dest(outputPath))
                    .on("end", function () {
                    vscode.window.setStatusBarMessage(util_1.successMessage);
                });
            }
        })["catch"](function (error) {
            var message = error.message + ' in file ' + error.filename + ' line no. ' + error.line;
            notificationStatus && vscode.window.showErrorMessage(message);
            vscode.window.setStatusBarMessage(util_1.errorMessage);
        });
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
};
