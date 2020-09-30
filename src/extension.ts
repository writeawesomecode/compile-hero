import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { exec } from "child_process";
import { StatusBarUi } from './status';
const { src, dest } = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const babelEnv = require("@babel/preset-env");
const less = require("gulp-less");
const cssmin = require("gulp-minify-css");
const ts = require("gulp-typescript");
const jade = require("gulp-jade");
const pug = require("pug");
const open = require("open");
const through = require("through2");
const sass = require("sass");
const { formatters, formatActiveDocument } = require("./beautify");
const successMessage = "✔ Compilation Successed!";
const errorMessage = "❌ Compilation Failed!";
const minimatch = require('minimatch');

const readFileContext = (path: string): string => {
  return fs.readFileSync(path).toString();
};

const fileType = (filename: string) => {
  const index1 = filename.lastIndexOf(".");
  const index2 = filename.length;
  const type = filename.substring(index1, index2);
  return type as FileSuffix;
};

const command = (cmd: string) => {
  return new Promise<string>((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      resolve(stdout);
    });
  });
};

const transformPort = (data: string): string => {
  let port: string = "";
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

const empty = function (code: string) {
  let stream = through.obj((file: any, encoding: any, callback: Function) => {
    if (!file.isBuffer()) {
      return callback();
    }
    file.contents = Buffer.from(code || "");
    stream.push(file);
    callback();
  });
  return stream;
};

const complieFile = (uri: string) => {
  readFileName({ fileName: uri });
};

const complieDir = (uri: string) => {
  const files = fs.readdirSync(uri);
  files.forEach((filename) => {
    const fileUrl = path.join(uri, filename);
    const fileStats = fs.statSync(fileUrl);
    if (fileStats.isDirectory()) {
      complieDir(fileUrl);
    } else {
      complieFile(fileUrl);
    }
  });
};

// 获取工作区位置
const getWorkspaceRoot = (doc: vscode.TextDocument) => {
  if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) return;
  if (!doc || doc.isUntitled) return vscode.workspace.workspaceFolders[0].uri.fsPath;

  const folder = vscode.workspace.getWorkspaceFolder(doc.uri);
  if (!folder) return;
  return folder.uri.fsPath;
};

interface OutputDirectoryPath {
  ".js": string;
  ".scss": string;
  ".sass": string;
  ".less": string;
  ".jade": string;
  ".ts": string;
  ".tsx": string;
  ".pug": string;
}

interface CompileStatus {
  ".js": boolean | undefined;
  ".scss": boolean | undefined;
  ".sass": boolean | undefined;
  ".less": boolean | undefined;
  ".jade": boolean | undefined;
  ".ts": boolean | undefined;
  ".tsx": boolean | undefined;
  ".pug": boolean | undefined;
}

interface CompileOptions {
  generateMinifiedHtml: boolean | undefined;
  generateMinifiedCss: boolean | undefined;
  generateMinifiedJs: boolean | undefined;
}

type FileSuffix =
  | ".js"
  | ".scss"
  | ".sass"
  | ".less"
  | ".jade"
  | ".ts"
  | ".tsx"
  | ".pug";

const readFileName = async ({ fileName }: { fileName: string }) => {
  let workspaceRootPath = vscode.workspace.rootPath;
  let fileSuffix: FileSuffix = fileType(fileName);
  let config = vscode.workspace.getConfiguration("compile-hero");
  let outputDirectoryPath: OutputDirectoryPath = {
    ".js": config.get<string>("javascript-output-directory") || "",
    ".scss": config.get<string>("scss-output-directory") || "",
    ".sass": config.get<string>("sass-output-directory") || "",
    ".less": config.get<string>("less-output-directory") || "",
    ".jade": config.get<string>("jade-output-directory") || "",
    ".ts": config.get<string>("typescript-output-directory") || "",
    ".tsx": config.get<string>("typescriptx-output-directory") || "",
    ".pug": config.get<string>("pug-output-directory") || "",
  };
  let compileStatus: CompileStatus = {
    ".js": config.get<boolean>("javascript-output-toggle"),
    ".scss": config.get<boolean>("scss-output-toggle"),
    ".sass": config.get<boolean>("sass-output-toggle"),
    ".less": config.get<boolean>("less-output-toggle"),
    ".jade": config.get<boolean>("jade-output-toggle"),
    ".ts": config.get<boolean>("typescript-output-toggle"),
    ".tsx": config.get<boolean>("typescriptx-output-toggle"),
    ".pug": config.get<boolean>("pug-output-toggle"),
  };
  let ignore = config.get<string[] | string>("ignore") || [];

  if (workspaceRootPath && fileName.startsWith(workspaceRootPath)) {
    let relativePath = path.relative(workspaceRootPath, fileName);
    if (!Array.isArray(ignore)) { ignore = [ignore] };
    if (ignore.some(glob => minimatch(relativePath, glob))) return;
  };

  let notificationStatus: boolean | undefined = config.get<boolean>("notification-toggle");

  let compileOptions: CompileOptions = {
    generateMinifiedHtml: config.get<boolean>("generate-minified-html"),
    generateMinifiedCss: config.get<boolean>("generate-minified-css"),
    generateMinifiedJs: config.get<boolean>("generate-minified-javascript"),
  };

  if (!compileStatus[fileSuffix]) return;
  let outputPath = path.resolve(fileName, "../", outputDirectoryPath[fileSuffix]);
  switch (fileSuffix) {
    case ".scss":
    case ".sass":
      try {
        const { css } = sass.renderSync({ file: fileName });
        const text = css.toString();
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
      break;
    case ".js":
      if (/.dev.js|.prod.js$/g.test(fileName)) {
        vscode.window.setStatusBarMessage(
          `The prod or dev file has been processed and will not be compiled`
        );
        break;
      }
      src(fileName)
        .pipe(
          babel({
            presets: [babelEnv],
          }).on("error", (error: any) => {
            notificationStatus && vscode.window.showErrorMessage(error.message);
            vscode.window.setStatusBarMessage(errorMessage);
          })
        )
        .pipe(rename({ suffix: ".dev" }))
        .pipe(dest(outputPath));
      if (compileOptions.generateMinifiedJs) {
        src(fileName)
          .pipe(
            babel({
              presets: [babelEnv],
            }).on("error", (error: any) => {
              notificationStatus && vscode.window.showErrorMessage(error.message);
              vscode.window.setStatusBarMessage(errorMessage);
            })
          )
          .pipe(uglify())
          .pipe(rename({ suffix: ".prod" }))
          .pipe(dest(outputPath));
      }
      vscode.window.setStatusBarMessage(successMessage);
      break;
    case ".less":
      src(fileName)
        .pipe(
          less().on("error", (error: any) => {
            notificationStatus && vscode.window.showErrorMessage(error.message);
            vscode.window.setStatusBarMessage(errorMessage);
          })
        )
        .pipe(dest(outputPath))
        .pipe(dest(outputPath))
        .on("end", () => {
          vscode.window.setStatusBarMessage(successMessage);
        });

      if (compileOptions.generateMinifiedCss) {
        src(fileName)
          .pipe(
            less().on("error", (error: any) => {
              notificationStatus && vscode.window.showErrorMessage(error.message);
              vscode.window.setStatusBarMessage(errorMessage);
            })
          )
          .pipe(dest(outputPath))
          .pipe(cssmin({ compatibility: "ie7" }))
          .pipe(rename({ suffix: ".min" }))
          .pipe(dest(outputPath))
          .on("end", () => {
            vscode.window.setStatusBarMessage(successMessage);
          });
      }
      break;
    case ".ts":
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

      break;
    case ".tsx":
      const tsxConfigPath = path.join(fileName, '../tsconfig.json');
      const isExistsTsxconfigPath = fs.existsSync(tsxConfigPath);

      src(fileName)
        .pipe((() => {
          if (isExistsTsxconfigPath) {
            const tsxConfig = ts.createProject(tsxConfigPath);
            return ts({
              jsx: "react",
            }).pipe(tsxConfig()).on("error", (error: any) => {
              false && vscode.window.showErrorMessage(error.message);
              vscode.window.setStatusBarMessage(errorMessage);
            })
          } else {
            return ts({
              jsx: "react",
            }).on("error", (error: any) => {
              false && vscode.window.showErrorMessage(error.message);
              vscode.window.setStatusBarMessage(errorMessage);
            })
          }
        })())
        .pipe(dest(outputPath));

      if (compileOptions.generateMinifiedJs) {
        src(fileName)
          .pipe((() => {
            if (isExistsTsxconfigPath) {
              const tsxConfig = ts.createProject(tsxConfigPath);
              return ts({
                jsx: "react",
              }).pipe(tsxConfig()).on("error", (error: any) => {
                false && vscode.window.showErrorMessage(error.message);
                vscode.window.setStatusBarMessage(errorMessage);
              })
            } else {
              return ts({
                jsx: "react",
              }).on("error", (error: any) => {
                false && vscode.window.showErrorMessage(error.message);
                vscode.window.setStatusBarMessage(errorMessage);
              })
            }
          })())
          .pipe(uglify())
          .pipe(dest(outputPath));
      }
      vscode.window.setStatusBarMessage(successMessage);
      break;
    case ".jade":
      src(fileName)
        .pipe(
          jade({
            pretty: true,
          }).on("error", (error: any) => {
            notificationStatus && vscode.window.showErrorMessage(error.message);
            vscode.window.setStatusBarMessage(errorMessage);
          })
        )
        .pipe(dest(outputPath));
      if (compileOptions.generateMinifiedHtml) {
        src(fileName)
          .pipe(
            jade().on("error", (error: any) => {
              notificationStatus && vscode.window.showErrorMessage(error.message);
              vscode.window.setStatusBarMessage(errorMessage);
            })
          )
          .pipe(rename({ suffix: ".min" }))
          .pipe(dest(outputPath));
      }
      vscode.window.setStatusBarMessage(successMessage);
      break;
    case ".pug":
      let html = "";
      try {
        html = pug.renderFile(fileName, {
          pretty: true,
        });
      } catch (error) {
        notificationStatus && vscode.window.showErrorMessage(error.message);
        vscode.window.setStatusBarMessage(errorMessage);
      }
      if (compileOptions.generateMinifiedHtml) {
        src(fileName)
          .pipe(empty(html))
          .pipe(
            rename({
              extname: ".html",
            })
          )
          .pipe(dest(outputPath))
          .pipe(empty(pug.renderFile(fileName)))
          .pipe(
            rename({
              suffix: ".min",
              extname: ".html",
            })
          )
          .pipe(dest(outputPath));
      }
      vscode.window.setStatusBarMessage(successMessage);
      break;
    default:
      console.log("Not Found!");
      break;
  }
};




export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, compile hero is now active!');
  let openInBrowser = vscode.commands.registerCommand(
    "compile-hero.openInBrowser",
    (path) => {
      let uri = path.fsPath;
      let platform = process.platform;
      open(uri, {
        app: [
          platform === "win32"
            ? "chrome"
            : platform === "darwin"
              ? "google chrome"
              : "google-chrome",
        ],
      }).catch((err: any) => {
        open(uri);
      });
    }
  );
  let closePort = vscode.commands.registerCommand(
    "compile-hero.closePort",
    async () => {
      let inputPort = await vscode.window.showInputBox({
        placeHolder: "Enter the port you need to close?",
      });
      let info = await command(`lsof -i :${inputPort}`);
      let port = transformPort(info);
      if (port) {
        await command(`kill -9 ${port}`);
        vscode.window.setStatusBarMessage("Port closed successfully!");
      }
    }
  );

  let compileFile = vscode.commands.registerCommand(
    "compile-hero.compileFile",
    (path) => {
      let uri = path.fsPath;
      try {
        if (fs.readdirSync(uri).length > 0) {
          complieDir(uri);
        } else {
          complieFile(uri);
        }
      } catch (error) {
        complieFile(uri);
      }
    }
  );

  let compileHeroOn = vscode.commands.registerCommand(
    "compile-hero.compileHeroOn",
    () => {
      let config = vscode.workspace.getConfiguration("compile-hero");
      config.update("disable-compile-files-on-did-save-code", true);
      StatusBarUi.notWatching();
    }
  );

  let compileHeroOff = vscode.commands.registerCommand(
    "compile-hero.compileHeroOff",
    () => {
      let config = vscode.workspace.getConfiguration("compile-hero");
      config.update("disable-compile-files-on-did-save-code", false);
      StatusBarUi.watching();
    }
  );

  formatters.configure();
  let beautify = vscode.commands.registerCommand('compile-hero.beautify', formatActiveDocument.bind(0, true));
  let beautifyFile = vscode.commands.registerCommand('compile-hero.beautifyFile', formatActiveDocument.bind(0, false));
  let formattersConfigure = vscode.workspace.onDidChangeConfiguration(formatters.configure.bind(formatters));
  let formattersOnFileOpen = vscode.workspace.onDidOpenTextDocument(formatters.onFileOpen.bind(formatters));

  context.subscriptions.push(openInBrowser);
  context.subscriptions.push(closePort);
  context.subscriptions.push(compileFile);
  context.subscriptions.push(compileHeroOn);
  context.subscriptions.push(compileHeroOff);
  context.subscriptions.push(beautify);
  context.subscriptions.push(beautifyFile);
  context.subscriptions.push(formattersConfigure);
  context.subscriptions.push(formattersOnFileOpen);

  vscode.workspace.onDidSaveTextDocument((document) => {
    let config = vscode.workspace.getConfiguration("compile-hero");
    let isDisableOnDidSaveTextDocument =
      config.get<string>("disable-compile-files-on-did-save-code") || "";
    if (isDisableOnDidSaveTextDocument) return;
    const { fileName } = document;
    readFileName({ fileName });
  });

  StatusBarUi.init(vscode.workspace.getConfiguration("compile-hero").get<string>("disable-compile-files-on-did-save-code") || "");
}
export function deactivate() {
  StatusBarUi.dispose();
}
