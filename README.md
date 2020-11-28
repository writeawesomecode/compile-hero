<!-- <a href="https://marketplace.visualstudio.com/items?itemName=Wscats.eno"><img src="https://img.shields.io/badge/Macketplace-v2.00-brightgreen" alt="Macketplace" /></a> -->
<!-- <a href="https://marketplace.visualstudio.com/items?itemName=Wscats.eno"><img src="https://img.shields.io/badge/Download-3M+-orange" alt="Download" /></a> -->
<a href="https://github.com/Wscats/compile-hero"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>
![badge version](https://vsmarketplacebadge.apphb.com/version-short/wscats.eno.svg?color=blue&style=flat-square)
![badge install](https://vsmarketplacebadge.apphb.com/installs-short/wscats.eno.svg?color=brightgreen&style=flat-square)
<!-- ![badge rate](https://vsmarketplacebadge.apphb.com/rating-short/wscats.eno.svg?color=red&style=flat-square) -->
<!-- ![badge download](https://vsmarketplacebadge.apphb.com/downloads-short/wscats.eno.svg?color=orange&style=flat-square) -->

[English](https://github.com/Wscats/compile-hero/blob/master/README.md) | [中文](https://gitee.com/wscats/compile-hero/blob/master/README.CN.md)

# Features

Easily work with `less, sass, scss, typescript, jade, pug and jsx` files in Visual Studio Code.

> 1.Please turn on the `Compile Hero: On` switch when using ↓

![Demo](./screenshots/9.png?raw=true)

> 2.Compile on save `(ctrl+s)` ↓

Or select `Compile Files` on right-click menu item for `less, sass, scss, typescript, jade, pug and jsx` files without using a build task.

![Demo](./screenshots/1.gif?raw=true)
![Demo](./screenshots/3.gif?raw=true)

You can also select part of the code and use the `Compile Selected` menu item or shortcut key `(ctrl+shift+s)` to perform partial compilation of the code block.

![Demo](./screenshots/10.gif?raw=true)

> 3.Beautify on save `(alt+shift+f)` or select `Format Document` on right-click menu item for `javascript, json, css, sass and html`.

![Demo](./screenshots/8.gif?raw=true)



- Compile `less, sass, scss, typescript, jade, pug and jsx` on save.
- Support autoprefixer for `less, scss, scss`.
- Support to open `html` files to preview in browser.
- minify `javascript` and `css` files.
- Beautify `javascript`, `json`, `css`, `sass`, and `html`.

| Before Compile | After Compile |
| -------------- | ------------- |
| .pug           | .html         |
| .jade          | .html         |
| .scss(sass)    | .css          |
| .less          | .css          |
| .ts/.tsx       | .js(JSX)      |
| .js(ES6)       | .js(ES5)      |

Easy to use. When you writing a file, press save `ctrl+s` to generate the compiled file in the same directory. I hope you can get rid of the constraint of `gulp` or `webpack`😁

# Extension Settings

Click to open the extension management interface `Configure Extension Settings`.

![Demo](./screenshots/5.gif?raw=true)

- You can change the output path of the project compilation directory.
- Toggle the compile switch of different language.
- Or disable automatic compilation on save `(ctrl+s)`.

| Whether the configuration is automatically compiled after saving`(ctrl+s)` | Default Value |
| -------------------------------------------------------------------------- | ------------- |
| disable-compile-files-on-did-save-code                                     | false         |

![Demo](./screenshots/7.gif?raw=true)

| Switch to control the notification | Default Value |
| ---------------------------------- | ------------- |
| notification-toggle | true |

| Switch to control compilation and formatting of specific files | Default Value |
| ---------------------------------- | ------------- |
| ignore | null |

| Output Path Configuration    | Default Value | Compile Switch Status     | Default Value |
| ---------------------------- | ------------- | ------------------------- | ------------- |
| javascript-output-directory  | ./dist        | javascript-output-toggle  | true          |
| sass-output-directory        | ./dist        | sass-output-toggle        | true          |
| scss-output-directory        | ./dist        | scss-output-toggle        | true          |
| less-output-directory        | ./dist        | less-output-toggle        | true          |
| jade-output-directory        | ./dist        | jade-output-toggle        | true          |
| typescript-output-directory  | ./dist        | typescript-output-toggle  | true          |
| typescriptx-output-directory | ./dist        | typescriptx-output-toggle | true          |
| pug-output-directory         | ./dist        | pug-output-toggle         | true          |
| generate-minified-html       | false         |
| generate-minified-css        | false         |
| generate-minified-javascript | false         |


## Using `settings.json`

Advanced Extension Settings:

- Project-wide settings are configured using the standard `settings.json` file (i.e. Workspace Settings).
- `settings.json` must exist in the .vscode directory at the root level of your project.
- Alternatively, settings can go in User Settings for global defaults.
- Use the `compile-hero` key.
- Prohibit partial compilation and formatting of specific files `compile-hero.ignore`.

Here Example `settings.json` file:

```json
{
  "compile-hero": {
    "disable-compile-files-on-did-save-code": false,
    "notification-toggle": false,
    "javascript-output-directory": "./out",
    "javascript-output-toggle": false,
    "sass-output-directory": "./out",
    "sass-output-toggle": true,
    "ignore": ["src/test.js", "*/test.scss", "**/spec/*", "**/src/**/*"],
  }
}
```

## Using `tsconfig.json`

If you want to add or overwrite certain settings in the `tsconfig.json` file, you can create a new `tsconfig.json` in the same directory of your `.ts` file.

Here Example `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "alwaysStrict": true,
    "importHelpers": false
  }
}
```

# Open In Browser

Right click the `html` file in the directory menu, and the `open in browser` option will appear. You can preview the page in the browser.

![Demo](./screenshots/2.gif?raw=true)

# Compile File Menu Item

Sometimes you may not need to automatically compile the file every time you save the file, at this time you can disable the automatic compilation. And use the `Compile File(s)` menu item to replace.

![Demo](./screenshots/6.gif?raw=true)

# Close Port Command(MAC)

At some point, you may be using ports for some services. You can use the `Close Port` command to close, but now only supported on mac.

![Demo](./screenshots/4.gif?raw=true)

# Thanks

<b><details><summary>Tencent Alloyteam Team && Qian Feng Team</summary>
| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats) | [<img src="https://avatars2.githubusercontent.com/u/5805270?s=460&v=4" width="60px;"/><br /><sub>Aaron Xie</sub>](https://github.com/aaron-xie) | [<img src="https://avatars3.githubusercontent.com/u/12515367?s=460&v=4" width="60px;"/><br /><sub>DK Lan</sub>](https://github.com/dk-lan) | [<img src="https://avatars1.githubusercontent.com/u/30917929?s=460&v=4" width="60px;"/><br /><sub>Yong</sub>](https://github.com/flowerField) | [<img src="https://avatars3.githubusercontent.com/u/33544236?s=460&v=4" width="60px;"/><br /><sub>Li Ting</sub>](https://github.com/Liting1) | <img src="https://avatars2.githubusercontent.com/u/50255537?s=400&u=cfd51a5f46862d14e92e032a5b7ec073b67a904b&v=4" width="60px;"/><br /><sub>Xin</sub> | [<img src="https://avatars0.githubusercontent.com/u/39754159?s=400&v=4" width="60px;"/><br /><sub>Lemon</sub>](https://github.com/lemonyyye) | [<img src="https://avatars3.githubusercontent.com/u/31915459?s=400&u=11ea9bc9baa62784208a29dddcd0a77789e9620f&v=4" width="60px;"/><br /><sub>Jing</sub>](https://github.com/vickySC) | [<img src="https://avatars2.githubusercontent.com/u/24653988?s=400&u=76227871dea8d4b57162093fde63b7d52910145d&v=4" width="60px;"/><br /><sub>Lin</sub>](https://github.com/shirley3790) | [<img src="https://avatars2.githubusercontent.com/u/23230108?s=460&v=4" width="60px;"/><br /><sub>Tian Fly</sub>](https://github.com/tiantengfly) |
| - | - | - | - | - | - | - | - | - | - |

If you enjoy front end, you should have it! Xie, Yao, Yong, Ting, Jing, Lin, Tian, Xin, Xia, DK and Lemon, thanks to my team for their efforts ~ Waiting for you in our heart！
</details></b>

If you think it's useful, you can leave us a [message and like it](https://marketplace.visualstudio.com/items?itemName=Wscats.qf&ssr=false#review-details), Your support is our driving force😀

# License

Compile Hero is released under the [MIT](http://opensource.org/licenses/MIT).
