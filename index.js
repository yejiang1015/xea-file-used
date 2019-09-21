/**
 * @Author yejiang1015
 * @Date 2019-09-21 13:26:36
 * @Last Modified by: yejiang1015
 * @Last Modified time: 2019-09-21 22:02:52
 * @Message file
 */

const fs = require("fs");

const { getAllFilesBody, getAllTestFilesPath, diffNoUsedFiles } = require("./utils");
module.exports = options => {
    /** 获取所有文件内容 */
    const allFilesBody = getAllFilesBody(options);
    /** 获取所有需要检测的文件格式的路径 */
    const allTestFilesPath = getAllTestFilesPath(options);
    const listString = diffNoUsedFiles(allFilesBody, allTestFilesPath);
    if (options.outputPath) {
        fs.writeFileSync(options.outputPath, listString, "utf-8");
    } else {
        console.log(listString);
    }
};
