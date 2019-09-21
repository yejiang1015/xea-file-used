const path = require("path");

const resolve = dir => {
    return path.join(__dirname, dir);
};
module.exports = {
    targetPath: resolve("src"),
    outputPath: resolve("xea-file-used.txt"),
    testRegExp: [".png", ".jpg", ".gif"],
    testPrefix: "src/asset",
    exclude: ["node_modules", ".DS_Store", "dist", ".git"]
};
