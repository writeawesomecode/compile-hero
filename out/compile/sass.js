"use strict";
/**
 * Copyright © 1998 - 2020 Tencent. All Rights Reserved.
 *
 * @author enoyao
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.sassLoader = void 0;
const vscode = require("vscode");
const { src, dest } = require("gulp");
const sass = require("sass");
const cssmin = require("gulp-minify-css");
const rename = require("gulp-rename");
const util_1 = require("../util");
exports.sassLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }) => {
    try {
        const text = selectedText || sass.renderSync({ file: fileName }).css.toString();
        src(fileName)
            .pipe(util_1.empty(text))
            .pipe(rename({
            extname: ".css",
        }))
            .pipe(dest(outputPath))
            .pipe(dest(outputPath));
        if (compileOptions.generateMinifiedCss) {
            src(fileName)
                .pipe(util_1.empty(text))
                .pipe(rename({
                extname: ".css",
            }))
                .pipe(dest(outputPath))
                .pipe(cssmin({ compatibility: "ie7" }))
                .pipe(rename({
                extname: ".css",
                suffix: ".min",
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
//# sourceMappingURL=sass.js.map