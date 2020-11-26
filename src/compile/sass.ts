/**
 * Copyright © 1998 - 2020 Tencent. All Rights Reserved.
 *
 * @author enoyao
 */

import * as vscode from "vscode";
const { src, dest } = require("gulp");
const sass = require("sass");
const cssmin = require("gulp-minify-css");
const rename = require("gulp-rename");
import { empty, successMessage, errorMessage, loader } from '../util';

export const sassLoader = ({ fileName, outputPath, notificationStatus, compileOptions, selectedText }: loader) => {
    try {
        const text = selectedText || sass.renderSync({ file: fileName }).css.toString();
        src(fileName)
            .pipe(empty(text))
            .pipe(
                rename({
                    extname: ".css",
                })
            )
            .pipe(dest(outputPath))
            .pipe(dest(outputPath));

        if (compileOptions.generateMinifiedCss) {
            src(fileName)
                .pipe(empty(text))
                .pipe(
                    rename({
                        extname: ".css",
                    })
                )
                .pipe(dest(outputPath))
                .pipe(cssmin({ compatibility: "ie7" }))
                .pipe(
                    rename({
                        extname: ".css",
                        suffix: ".min",
                    })
                )
                .pipe(dest(outputPath));
        }
        vscode.window.setStatusBarMessage(successMessage);
    } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
    }
}
