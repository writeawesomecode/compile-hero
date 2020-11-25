"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jadeLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const jade = require("gulp-jade");
const { src, dest } = require("gulp");
const rename = require("gulp-rename");
exports.jadeLoader = ({ fileName, outputPath, notificationStatus, compileOptions }) => {
    src(fileName)
        .pipe(jade({
        pretty: true,
    }).on("error", (error) => {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }))
        .pipe(dest(outputPath));
    if (compileOptions.generateMinifiedHtml) {
        src(fileName)
            .pipe(jade().on("error", (error) => {
            notificationStatus && vscode.window.showErrorMessage(error.message);
            vscode.window.setStatusBarMessage(util_1.errorMessage);
        }))
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(util_1.successMessage);
};
//# sourceMappingURL=jade.js.map