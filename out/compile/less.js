"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessLoader = void 0;
const util_1 = require("../util");
const vscode = require("vscode");
const cssmin = require("gulp-minify-css");
const { src, dest } = require("gulp");
const less = require("gulp-less");
const rename = require("gulp-rename");
exports.lessLoader = ({ fileName, outputPath, notificationStatus, compileOptions }) => {
    src(fileName)
        .pipe(less().on("error", (error) => {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(util_1.errorMessage);
    }))
        .pipe(dest(outputPath))
        .pipe(dest(outputPath))
        .on("end", () => {
        vscode.window.setStatusBarMessage(util_1.successMessage);
    });
    if (compileOptions.generateMinifiedCss) {
        src(fileName)
            .pipe(less().on("error", (error) => {
            notificationStatus && vscode.window.showErrorMessage(error.message);
            vscode.window.setStatusBarMessage(util_1.errorMessage);
        }))
            .pipe(dest(outputPath))
            .pipe(cssmin({ compatibility: "ie7" }))
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(outputPath))
            .on("end", () => {
            vscode.window.setStatusBarMessage(util_1.successMessage);
        });
    }
};
//# sourceMappingURL=less.js.map