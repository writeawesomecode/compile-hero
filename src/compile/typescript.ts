import { successMessage, errorMessage, loader } from '../util';
import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
const ts = require("gulp-typescript");
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");

export const typescriptLoader = ({ fileName, outputPath, notificationStatus, compileOptions }: loader) => {
    const tsConfigPath = path.join(fileName, '../tsconfig.json');
    const isExistsTsconfigPath = fs.existsSync(tsConfigPath)

    src(fileName)
        .pipe((() => {
            if (isExistsTsconfigPath) {
                const tsConfig = ts.createProject(tsConfigPath);
                return ts().pipe(tsConfig()).on("error", (error: any) => {
                    false && vscode.window.showErrorMessage(error.message);
                    vscode.window.setStatusBarMessage(errorMessage);
                })
            } else {
                return ts().on("error", (error: any) => {
                    false && vscode.window.showErrorMessage(error.message);
                    vscode.window.setStatusBarMessage(errorMessage);
                })
            }
        })())
        .pipe(dest(outputPath));
    if (compileOptions.generateMinifiedJs) {
        src(fileName)
            .pipe((() => {
                if (isExistsTsconfigPath) {
                    const tsConfig = ts.createProject(tsConfigPath);
                    return ts().pipe(tsConfig()).on("error", (error: any) => {
                        false && vscode.window.showErrorMessage(error.message);
                        vscode.window.setStatusBarMessage(errorMessage);
                    })
                } else {
                    return ts().on("error", (error: any) => {
                        false && vscode.window.showErrorMessage(error.message);
                        vscode.window.setStatusBarMessage(errorMessage);
                    })
                }
            })())
            .pipe(
                uglify().on("error", (error: any) => {
                    false && vscode.window.showErrorMessage(error.message);
                    vscode.window.setStatusBarMessage(errorMessage);
                })
            )
            .pipe(dest(outputPath));
    }
    vscode.window.setStatusBarMessage(successMessage);
}