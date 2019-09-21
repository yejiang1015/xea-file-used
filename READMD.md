# xea-file-used

# 什么是 xea-file-used

-   自动化 - xea-file-used 是一个 node 工具， 可帮助您自动检测出项目中哪些图片文件没有被使用
-   简单使用 - 通过提供的命令行即可开始使用，易于学习且易于使用

# 安装

You can install xea-file-used using npm:

```js
$ npm install xea-file-used --save-dev
```

# 配置

可选择的配置、xea-file-used 具有默认配置。可通过根目录添加配置文件 `xea.config.js` 来自定义覆盖默认配置。
注意：自定义配置都是覆盖字段的值。所以如果要自定义 `exclude` 字段，则需要手动把 `node_modules` 加上，如果你要排除的话
如果没有检测到配置文件则使用默认的配置去检测

```js
const path = require("path");

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
    /** 指定需要检测的目录 */
    targetPath: resolve("src"),
    /** 指定检测输出结果到指定文件。如果没有配置该值则默认控制台打印，配置了则输出到指定文件 */
    outputPath: resolve("xea-file-used.txt"),
    /** 要检测的文件格式 */
    testRegExp: [".png", ".jpg", ".gif"],
    /** 公共的文件引用 例如：<img src="%src/asset%/home/logo.png" /> | <img src="%src/asset%/user/head.png" /> */
    testPrefix: "src/asset",
    /** 需要排除的文件夹 */
    exclude: ["node_modules", ".DS_Store", "dist", ".git"]
};
```

# 使用

-   `npm install xea-file-used --save-dev`
-   package.json

```js
"scripts": {
    ...
    "xea-file-used": "xea-file-used"
}

```

-   run `npm run xea-file-used`

-   没有配置输出文件 控制台输出列表

```js
[
    "/Users/username/.../myApp/src/asset/home/logo.png",
    "/Users/username/.../myApp/src/asset/user/head.png",
    ...
]
✨  Done in 0.39s.

```

-   配置输出文件 没有控制台输出 输出内容到指定文件

```js
文件位置 %root%/xea-file-used.txt
文件内容：
[
    "/Users/username/.../myApp/src/asset/home/logo.png",
    "/Users/username/.../myApp/src/asset/user/head.png",
    ...
]
```
