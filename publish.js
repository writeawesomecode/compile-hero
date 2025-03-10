const fs = require('fs');
const packageJson = {
    "name": "eno",
    "displayName": "Sass/Less/Scss/Typescript/Javascript/Jade/Pug Compile Hero Pro",
    "description": "🚀Easy to compile ts, tsx, scss, less, jade, pug and es6+ on save without using a build task.",
    "author": {
        "name": "Eno Yao",
        "email": "kalone.cool@gmail.com",
        "url": "https://github.com/Wscats"
    },
    "publisher": "Wscats",
    "version": "2.3.26",
    "preview": true,
    "icon": "logos/hero2.png",
    "homepage": "https://github.com/Wscats/compile-hero",
    "engines": {
        "vscode": "^1.39.0"
    },
    "badges": [
        {
            "url": "https://img.shields.io/badge/vscode--dev--community-compilehero-blue.svg?logo=slack&labelColor=555555",
            "href": "https://vscode-slack.amod.io",
            "description": "Join us in the #compilehero channel"
        }
    ],
    "galleryBanner": {
        "color": "#58bc58",
        "theme": "dark"
    },
    "bugs": {
        "url": "https://github.com/Wscats/compile-hero/issues/new"
    },
    "license": "MIT",
    "repository": {
        "type": "git",
        "url": "https://github.com/Wscats/compile-hero"
    },
    "categories": [
        "Other",
        "Programming Languages",
        "Snippets",
        "Linters",
        "Debuggers",
        "Formatters"
    ],
    "keywords": [
        "sass",
        "beautify",
        "scss",
        "typescript",
        "ts",
        "less",
        "stylus",
        "ES6",
        "ES5",
        "JS",
        "css",
        "javascript",
        "html",
        "compile",
        "translate",
        "tsx",
        "jade",
        "hero",
        "close",
        "port",
        "pug",
        "easysass",
        "easy",
        "super",
        "minified",
        "format",
        "json",
        "formatter",
        "formate"
    ],
    "activationEvents": [
        "*",
        "onCommand:compile-hero.openInBrowser",
        "onCommand:compile-hero.closePort",
        "onCommand:compile-hero.compileFile",
        "onCommand:compile-hero.compileSelected",
        "onCommand:compile-hero.compileHeroOn",
        "onCommand:compile-hero.compileHeroOff",
        "onCommand:compile-hero.beautify",
        "onCommand:compile-hero.beautifyFile"
    ],
    "main": "./out/extension.js",
    "contributes": {
        "commands": [
            {
                "command": "compile-hero.openInBrowser",
                "title": "Open In Browser"
            },
            {
                "command": "compile-hero.closePort",
                "title": "Close Port"
            },
            {
                "command": "compile-hero.compileSelected",
                "title": "Compile Selected"
            },
            {
                "command": "compile-hero.compileFile",
                "title": "Compile Files"
            },
            {
                "command": "compile-hero.beautify",
                "title": "Beautify"
            },
            {
                "command": "compile-hero.beautifyFile",
                "title": "Beautify File"
            }
        ],
        "languages": [
            {
                "id": "json",
                "aliases": [
                    "JSON"
                ],
                "filenames": [
                    ".jsbeautifyrc",
                    ".jshintrc"
                ]
            }
        ],
        "jsonValidation": [
            {
                "fileMatch": ".jsbeautifyrc",
                "url": "./beautifyrc.json"
            }
        ],
        "configuration": {
            "title": "Compile hero configuration",
            "properties": {
                "compile-hero.disable-compile-files-on-did-save-code": {
                    "type": "boolean",
                    "default": true,
                    "description": "Disable compile files on did save code."
                },
                "compile-hero.javascript-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling javascript."
                },
                "compile-hero.sass-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling sass."
                },
                "compile-hero.scss-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling sass."
                },
                "compile-hero.less-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling less."
                },
                "compile-hero.stylus-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling stylus."
                },
                "compile-hero.jade-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling jade."
                },
                "compile-hero.typescript-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling typescript."
                },
                "compile-hero.typescriptx-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling typescriptx."
                },
                "compile-hero.pug-output-directory": {
                    "type": "string",
                    "default": "./dist",
                    "description": "Set the directory to output after compiling pug."
                },
                "compile-hero.javascript-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of javascript."
                },
                "compile-hero.sass-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of sass."
                },
                "compile-hero.scss-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of sass."
                },
                "compile-hero.less-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of less."
                },
                "compile-hero.stylus-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of stylus."
                },
                "compile-hero.jade-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of jade."
                },
                "compile-hero.typescript-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of typescript."
                },
                "compile-hero.typescriptx-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of typescriptx."
                },
                "compile-hero.pug-output-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the compilation of pug."
                },
                "compile-hero.notification-toggle": {
                    "type": "boolean",
                    "default": true,
                    "description": "Switch to control the notification."
                },
                "compile-hero.generate-minified-html": {
                    "type": "boolean",
                    "default": false,
                    "description": "Enable to generate minified html (*.min.html) files."
                },
                "compile-hero.generate-minified-css": {
                    "type": "boolean",
                    "default": false,
                    "description": "Enable to generate minified css (*.min.css) files."
                },
                "compile-hero.generate-minified-javascript": {
                    "type": "boolean",
                    "default": false,
                    "description": "Enable to generate minified javascript (*.dev.js) files."
                },
                "compile-hero.ignore": {
                    "type": [
                        "string",
                        "array"
                    ],
                    "items": {
                        "type": "string"
                    },
                    "default": [],
                    "description": "List of paths to ignore when using format or compile command, including format or compile on save, uses glob pattern matching.",
                    "scope": "resource"
                },
                "compile-hero.config": {
                    "type": [
                        "string",
                        "object",
                        "null"
                    ],
                    "default": null,
                    "description": "A path to a file, or an object containing the configuration options for js-beautify, if the .jsbeautifyrc file exists in project root, it overrides this configuration."
                },
                "compile-hero.language": {
                    "type": "object",
                    "description": "Link file types to the beautifier type.",
                    "default": {
                        "js": {
                            "type": [
                                "javascript",
                                "json",
                                "jsonc"
                            ],
                            "filename": [
                                ".jshintrc",
                                ".jsbeautifyrc"
                            ]
                        },
                        "css": [
                            "css",
                            "less",
                            "scss"
                        ],
                        "html": [
                            "htm",
                            "html"
                        ]
                    },
                    "properties": {
                        "js": {
                            "type": [
                                "object",
                                "array",
                                "null"
                            ],
                            "items": {
                                "type": "string"
                            },
                            "description": "Array of language types, or an object containing types, extensions and filenames to associate",
                            "properties": {
                                "type": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "VS Code language name"
                                },
                                "ext": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "File extensions (without the leading dot)"
                                },
                                "filename": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "Full filenames (eg: '.jsbeautifyrc')"
                                }
                            }
                        },
                        "css": {
                            "type": [
                                "object",
                                "array",
                                "null"
                            ],
                            "items": {
                                "type": "string"
                            },
                            "description": "Array of language types, or an object containing types, extensions and filenames to associate",
                            "properties": {
                                "type": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "VS Code language name"
                                },
                                "ext": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "File extensions (without the leading dot)"
                                },
                                "filename": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "Full filenames (eg: '.jsbeautifyrc')"
                                }
                            }
                        },
                        "html": {
                            "type": [
                                "object",
                                "array",
                                "null"
                            ],
                            "items": {
                                "type": "string"
                            },
                            "description": "Array of language types, or an object containing types, extensions and filenames to associate",
                            "properties": {
                                "type": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "VS Code language name"
                                },
                                "ext": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "File extensions (without the leading dot)"
                                },
                                "filename": {
                                    "type": "array",
                                    "items": {
                                        "type": "string"
                                    },
                                    "description": "Full filenames (eg: '.jsbeautifyrc')"
                                }
                            }
                        }
                    }
                }
            }
        },
        "keybindings": [
            {
                "when": "editorHasSelection && resourceLangId =~ /^less$|^scss$|^jade$|^pug$|^stylus$/",
                "command": "compile-hero.compileSelected",
                "key": "cmd+shift+s ctrl+shift+s",
                "mac": "cmd+shift+s",
                "win": "ctrl+shift+s"
            }
        ],
        "menus": {
            "explorer/context": [
                {
                    "when": "resourceLangId == html",
                    "command": "compile-hero.openInBrowser",
                    "group": "open-in-browser"
                },
                {
                    "command": "compile-hero.compileFile",
                    "group": "navigation"
                },
                {
                    "when": "editorHasSelection && resourceLangId =~ /^less$|^scss$|^jade$|^pug$|^stylus$/",
                    "command": "compile-hero.compileSelected",
                    "group": "navigation"
                }
            ],
            "editor/context": [
                {
                    "when": "resourceLangId == html",
                    "command": "compile-hero.openInBrowser",
                    "group": "open-in-browser"
                },
                {
                    "command": "compile-hero.compileFile",
                    "group": "navigation"
                },
                {
                    "when": "editorHasSelection && resourceLangId =~ /^less$|^scss$|^jade$|^pug$|^stylus$/",
                    "command": "compile-hero.compileSelected",
                    "group": "navigation"
                }
            ],
            "editor/title/context": [
                {
                    "when": "resourceLangId == html",
                    "command": "compile-hero.openInBrowser",
                    "group": "open-in-browser"
                },
                {
                    "command": "compile-hero.compileFile",
                    "group": "navigation"
                },
                {
                    "when": "editorHasSelection && resourceLangId =~ /^less$|^scss$|^jade$|^pug$|^stylus$/",
                    "command": "compile-hero.compileSelected",
                    "group": "navigation"
                }
            ]
        }
    },
    "scripts": {
        "build": "npm run build:delete.vsix && npm run build:compile.hero && npm run build:beautify",
        "vscode:prepublish": "yarn run compile",
        "build:delete.vsix": "node publish d",
        "build:compile.hero": "node publish c && vsce package",
        "build:beautify": "node publish b && vsce package",
        "compile": "tsc -p ./",
        "watch": "tsc -watch -p ./",
        "postinstall": "node ./node_modules/vscode/bin/install",
        "test": "yarn run compile && node ./node_modules/vscode/bin/test"
    },
    "dependencies": {
        "@babel/core": "^7.7.0",
        "@babel/preset-env": "^7.7.1",
        "editorconfig": "^0.15.3",
        "gulp": "^4.0.2",
        "gulp-babel": "^8.0.0",
        "gulp-minify-css": "^1.2.4",
        "gulp-rename": "^1.4.0",
        "gulp-typescript": "^5.0.1",
        "gulp-uglify": "^3.0.2",
        "js-beautify": "^1.13.0",
        "minimatch": "^3.0.4",
        "pug": "^2.0.4",
        "sass": "^1.26.10",
        "less": "^3.12.2",
        "typescript": "^3.3.1",
        "stylus": "^0.54.8"
    },
    "devDependencies": {
        "vscode": "^1.1.28",
        "@types/mocha": "^2.2.42",
        "@types/node": "^10.12.21",
    }
}

const deleteVsix = (uri) => {
    const files = fs.readdirSync(uri);
    files.forEach((filename) => {
        if (filename.indexOf('vsix') >= 0) {
            fs.unlinkSync(filename);
        }
    });
};

switch (process.argv[2]) {
    case 'c':
        packageJson.name = "qf";
        packageJson.displayName = "Formatter Hero - Beautify Sass/Less/Scss/Typescript/Javascript/Jade/Pug";
        packageJson.description = "🧣Beautify sass, less, scss, typescript, javascript, jade and pug.";
        packageJson.version = "6.8.107";
        packageJson.preview = true;
        packageJson.icon = "logos/hero4.png";
        packageJson.contributes.configuration.properties["compile-hero.disable-compile-files-on-did-save-code"] = {
            "type": "boolean",
            "default": true,
            "description": "Disable compile files on did save code."
        };
        packageJson.contributes.commands = [
            {
                "command": "compile-hero.openInBrowser",
                "title": "Open In Browser(Pro)"
            },
            {
                "command": "compile-hero.closePort",
                "title": "Close Port(Pro)"
            },
            {
                "command": "compile-hero.compileSelected",
                "title": "Compile Selected(Pro)"
            },
            {
                "command": "compile-hero.compileFile",
                "title": "Compile Files(Pro)"
            },
            {
                "command": "compile-hero.beautify",
                "title": "Beautify(Pro)"
            },
            {
                "command": "compile-hero.beautifyFile",
                "title": "Beautify File(Pro)"
            }
        ];
        fs.writeFileSync('./package.json', JSON.stringify(packageJson));
        break;
    case 'b':
        packageJson.name = "eno";
        packageJson.displayName = "Sass/Less/Stylus/Typescript/Javascript/Jade/Pug Compile Hero Pro";
        packageJson.description = "🚀Easy to compile ts, tsx, scss, less, stylus, jade, pug and es6+ on save without using a build task.";
        packageJson.contributes.configuration.properties["compile-hero.disable-compile-files-on-did-save-code"] = {
            "type": "boolean",
            "default": true,
            "description": "Disable compile files on did save code."
        };
        packageJson.version = "2.3.38";
        packageJson.preview = true;
        packageJson.icon = "logos/hero2.png";
        fs.writeFileSync('./package.json', JSON.stringify(packageJson));
        break;
    case 'd':
        deleteVsix(__dirname);
}