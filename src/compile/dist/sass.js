"use strict";
exports.__esModule = true;
exports.sassLoader = void 0;
var vscode = require("vscode");
var _a = require("gulp"), src = _a.src, dest = _a.dest;
var sass = require("sass");
var cssmin = require("gulp-minify-css");
var rename = require("gulp-rename");
var util_1 = require("../util");
exports.sassLoader = function (_a) {
    var fileName = _a.fileName, outputPath = _a.outputPath, notificationStatus = _a.notificationStatus, compileOptions = _a.compileOptions, selectedText = _a.selectedText;
    try {
        var text = selectedText || sass.renderSync({ file: fileName }).css.toString();
        src(fileName)
            .pipe(util_1.empty(text))
            .pipe(rename({
            extname: ".css"
        }))
            .pipe(dest(outputPath))
            .pipe(dest(outputPath));
        if (compileOptions.generateMinifiedCss) {
            src(fileName)
                .pipe(util_1.empty(text))
                .pipe(rename({
                extname: ".css"
            }))
                .pipe(dest(outputPath))
                .pipe(cssmin({ compatibility: "ie7" }))
                .pipe(rename({
                extname: ".css",
                suffix: ".min"
            }))
                .pipe(dest(outputPath));
        }
        vscode.window.setStatusBarMessage(util_1.successMessage);
    }
    catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }
};
