"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFileName = exports.getWorkspaceRoot = exports.complieDir = exports.complieFile = exports.empty = exports.transformPort = exports.command = exports.fileType = exports.readFileContext = exports.errorMessage = exports.successMessage = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const fs = require("fs");
const path = require("path");
const through = require("through2");
const minimatch = require('minimatch');
const sass_1 = require("./compile/sass");
const javascript_1 = require("./compile/javascript");
const less_1 = require("./compile/less");
const typescript_1 = require("./compile/typescript");
const typescriptx_1 = require("./compile/typescriptx");
const jade_1 = require("./compile/jade");
const pug_1 = require("./compile/pug");
exports.successMessage = "✔ Compilation Successed!";
exports.errorMessage = "❌ Compilation Failed!";
exports.readFileContext = (path) => {
    return fs.readFileSync(path).toString();
};
exports.fileType = (filename) => {
    const index1 = filename.lastIndexOf(".");
    const index2 = filename.length;
    const type = filename.substring(index1, index2);
    return type;
};
exports.command = (cmd) => {
    return new Promise((resolve, reject) => {
        child_process_1.exec(cmd, (err, stdout, stderr) => {
            resolve(stdout);
        });
    });
};
exports.transformPort = (data) => {
    let port = "";
    data.split(/[\n|\r]/).forEach((item) => {
        if (item.indexOf("LISTEN") !== -1 && !port) {
            let reg = item.split(/\s+/);
            if (/\d+/.test(reg[1])) {
                port = reg[1];
            }
        }
    });
    return port;
};
exports.empty = function (code) {
    let stream = through.obj((file, encoding, callback) => {
        if (!file.isBuffer()) {
            return callback();
        }
        file.contents = Buffer.from(code || "");
        stream.push(file);
        callback();
    });
    return stream;
};
exports.complieFile = (uri) => {
    exports.readFileName({ fileName: uri });
};
exports.complieDir = (uri) => {
    const files = fs.readdirSync(uri);
    files.forEach((filename) => {
        const fileUrl = path.join(uri, filename);
        const fileStats = fs.statSync(fileUrl);
        if (fileStats.isDirectory()) {
            exports.complieDir(fileUrl);
        }
        else {
            exports.complieFile(fileUrl);
        }
    });
};
// 获取工作区位置
exports.getWorkspaceRoot = (doc) => {
    if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0)
        return;
    if (!doc || doc.isUntitled)
        return vscode.workspace.workspaceFolders[0].uri.fsPath;
    const folder = vscode.workspace.getWorkspaceFolder(doc.uri);
    if (!folder)
        return;
    return folder.uri.fsPath;
};
exports.readFileName = ({ fileName }) => __awaiter(void 0, void 0, void 0, function* () {
    let workspaceRootPath = vscode.workspace.rootPath;
    let fileSuffix = exports.fileType(fileName);
    let config = vscode.workspace.getConfiguration("compile-hero");
    let outputDirectoryPath = {
        ".js": config.get("javascript-output-directory") || "",
        ".scss": config.get("scss-output-directory") || "",
        ".sass": config.get("sass-output-directory") || "",
        ".less": config.get("less-output-directory") || "",
        ".jade": config.get("jade-output-directory") || "",
        ".ts": config.get("typescript-output-directory") || "",
        ".tsx": config.get("typescriptx-output-directory") || "",
        ".pug": config.get("pug-output-directory") || "",
    };
    let compileStatus = {
        ".js": config.get("javascript-output-toggle"),
        ".scss": config.get("scss-output-toggle"),
        ".sass": config.get("sass-output-toggle"),
        ".less": config.get("less-output-toggle"),
        ".jade": config.get("jade-output-toggle"),
        ".ts": config.get("typescript-output-toggle"),
        ".tsx": config.get("typescriptx-output-toggle"),
        ".pug": config.get("pug-output-toggle"),
    };
    let ignore = config.get("ignore") || [];
    if (workspaceRootPath && fileName.startsWith(workspaceRootPath)) {
        let relativePath = path.relative(workspaceRootPath, fileName);
        if (!Array.isArray(ignore)) {
            ignore = [ignore];
        }
        ;
        if (ignore.some(glob => minimatch(relativePath, glob)))
            return;
    }
    ;
    let notificationStatus = config.get("notification-toggle");
    let compileOptions = {
        generateMinifiedHtml: config.get("generate-minified-html"),
        generateMinifiedCss: config.get("generate-minified-css"),
        generateMinifiedJs: config.get("generate-minified-javascript"),
    };
    if (!compileStatus[fileSuffix])
        return;
    let outputPath = path.resolve(fileName, "../", outputDirectoryPath[fileSuffix]);
    switch (fileSuffix) {
        case ".scss":
        case ".sass":
            sass_1.sassLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".js":
            javascript_1.javascriptLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".less":
            less_1.lessLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".ts":
            typescript_1.typescriptLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".tsx":
            typescriptx_1.typescriptxLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".jade":
            jade_1.jadeLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        case ".pug":
            pug_1.pugLoader({ fileName, outputPath, notificationStatus, compileOptions });
            break;
        default:
            console.log("Not Found!");
            break;
    }
});
//# sourceMappingURL=util.js.map