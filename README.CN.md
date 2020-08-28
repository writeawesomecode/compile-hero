<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.eno"><img src="https://img.shields.io/badge/Download-2k+-orange" alt="Download" /></a>
<a href="https://marketplace.visualstudio.com/items?itemName=Wscats.eno"><img src="https://img.shields.io/badge/Macketplace-v2.00-brightgreen" alt="Macketplace" /></a>
<a href="https://github.com/Wscats/compile-hero"><img src="https://img.shields.io/badge/Github Page-Wscats-yellow" alt="Github Page" /></a>
<a href="https://github.com/Wscats"><img src="https://img.shields.io/badge/Author-Eno Yao-blueviolet" alt="Eno Yao" /></a>
<a href="https://github.com/Wscats"><img src="https://api.netlify.com/api/v1/badges/b652768b-1673-42cd-98dd-3fd807b2ebca/deploy-status" alt="Status" /></a>

[English](https://github.com/Wscats/compile-hero/blob/master/README.md) | [中文](https://github.com/Wscats/compile-hero/blob/master/README.CN.md)

# 特性

支持在 Visual Studio Code 中自动编译以下文件：`less, sass, scss, typescript, jade, pug and jsx`.

按快捷键 `(ctrl+s)` 或者在文件列表右键菜单选择 `Compile File(s)` 命令启动编译，将会在该文件的同级目录 `dist` 下生成编译后的文件，希望能你远离 webpack 和 gulp 等编译工具繁琐的操作.

按快捷键 `(alt+shift+f)` 或者在文件列表右键菜单选择 `Format Document` 将会帮你自动格式化文件.

![Demo](screenshots/1.gif)
![Demo](screenshots/3.gif)
![Demo](screenshots/8.gif)

- 按保存 `Ctrl+S` 会自动编译编译 `less, sass, scss, typescript, jade, pug and jsx` 等文件.
- 支持 `less, scss, scss` 等文件代码高亮.
- 支持在默认浏览器打开 `html` 文件.
- 支持压缩 `javascript` 和 `css` 文件.
- 支持格式化 `javascript`, `json`, `css`, `sass`, 和 `html` 等文件.

| 编译前      | 编译后   |
| ----------- | -------- |
| .pug        | .html    |
| .jade       | .html    |
| .scss(sass) | .css     |
| .less       | .css     |
| .ts/.tsx    | .js(JSX) |
| .js(ES6)    | .js(ES5) |

# 配置参数

点击插件的配置选项 `Extension Settings`

- 你可以修改编译后目录和文件的输出位置
- 点击编辑器底部栏右下角 `Compile Hero: On/Off`，可以切换不同语言的自动编译开关

| 是否开启按 `(ctrl+s)` 时自动编译文件（所有语言的自动编译总开关） | 默认值 |
| ---------------------------------------------------------------- | ------ |
| disable-compile-files-on-did-save-code                           | false  |

![Demo](screenshots/7.gif)

| 配置文件编译后的目录的输出路径 | 默认值 | 是否开启按 `(ctrl+s)` 时自动编译文件 | 默认值 |
| ------------------------------ | ------ | ------------------------------------ | ------ |
| javascript-output-directory    | ./dist | javascript-output-toggle             | true   |
| sass-output-directory          | ./dist | sass-output-toggle                   | true   |
| scss-output-directory          | ./dist | scss-output-toggle                   | true   |
| less-output-directory          | ./dist | less-output-toggle                   | true   |
| jade-output-directory          | ./dist | jade-output-toggle                   | true   |
| typescript-output-directory    | ./dist | typescript-output-toggle             | true   |
| typescriptx-output-directory   | ./dist | typescriptx-output-toggle            | true   |
| pug-output-directory           | ./dist | pug-output-toggle                    | true   |
| generate-minified-html         | false  |
| generate-minified-css          | false  |
| generate-minified-javascript   | false  |

![Demo](screenshots/5.gif)

高级配置:

- Project-wide settings are configured using the standard `settings.json` file (i.e. Workspace Settings).
- `settings.json` must exist in the .vscode directory at the root level of your project.
- Alternatively, settings can go in User Settings for global defaults.
- Use the `compile-hero` key.

Here Example settings.json file:

```json
{
  "compile-hero": {
    "disable-compile-files-on-did-save-code": false,
    "javascript-output-directory": "./out",
    "javascript-output-toggle": false,
    "sass-output-directory": "./out",
    "sass-output-toggle": true
  }
}
```

# Open In Browser

在目录菜单对着`xxx.html`文件点击右键，会出现`在谷歌浏览器中打开`选项，可以在浏览器中预览该页面。

<img width="200" src="https://wscats.github.io/compile-hero/chrome-extension/screenshot/7.jpg" />



# Thanks

| [<img src="https://avatars1.githubusercontent.com/u/17243165?s=460&v=4" width="60px;"/><br /><sub>Eno Yao</sub>](https://github.com/Wscats) | [<img src="https://avatars2.githubusercontent.com/u/5805270?s=460&v=4" width="60px;"/><br /><sub>Aaron Xie</sub>](https://github.com/aaron-xie) | [<img src="https://avatars3.githubusercontent.com/u/12515367?s=460&v=4" width="60px;"/><br /><sub>DK Lan</sub>](https://github.com/dk-lan) | [<img src="https://avatars1.githubusercontent.com/u/30917929?s=460&v=4" width="60px;"/><br /><sub>Yong</sub>](https://github.com/flowerField) | [<img src="https://avatars3.githubusercontent.com/u/33544236?s=460&v=4" width="60px;"/><br /><sub>Li Ting</sub>](https://github.com/Liting1) | <img src="https://wscats.github.io/omi-snippets/images/xin.jpg" width="60px;"/><br /><sub>Xin</sub> | [<img src="https://wscats.github.io/omi-snippets/images/lemon.jpg" width="60px;"/><br /><sub>Lemon</sub>](https://github.com/lemonyyye) | [<img src="https://wscats.github.io/omi-snippets/images/jing.jpg" width="60px;"/><br /><sub>Jing</sub>](https://github.com/vickySC) | [<img src="https://wscats.github.io/omi-snippets/images/lin.jpg" width="60px;"/><br /><sub>Lin</sub>](https://github.com/shirley3790) | [<img src="https://avatars2.githubusercontent.com/u/23230108?s=460&v=4" width="60px;"/><br /><sub>Tian Fly</sub>](https://github.com/tiantengfly) |
| ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |

<!-- - 寂寂空郊暮，非复少年时 -->

要玩转H5这个插件你值得拥有！老谢，姚帅，勇哥，挺哥，婧婧，琳姐，田田，阿信，粤玲，老蓝，柠檬~在广州等你哦！

如果你觉得有用，你可以给我们[留言和点赞](https://marketplace.visualstudio.com/items?itemName=Wscats.qf&ssr=false#review-details)，你的支持是我们前进的动力😀


# License

Qian Feng Hero is released under the [MIT](http://opensource.org/licenses/MIT)
