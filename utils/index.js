/**
 * @file [utils]
 */

const fs = require("fs");
const path = require("path");

function getFileList(options, isExclude) {
    const dir = options.targetPath;
    const reg = options.testRegExp;
    const exclude = options.exclude;
    let fileList = [];
    const regExp = new RegExp(reg.join("|"));
    const excludeRegExp = new RegExp(exclude.join("|"));

    const handle = dir => {
        if (!fs.existsSync(dir)) {
            return "";
        }
        const readDirList = fs.readdirSync(dir);
        for (let i = 0; i < readDirList.length; i++) {
            const localdir = path.join(dir, readDirList[i]);
            /** 过滤文件夹 */
            if (!excludeRegExp.test(localdir)) {
                let fileType = fs.statSync(localdir);
                if (fileType.isDirectory()) {
                    /** 是否是文件夹 */
                    handle(localdir);
                } else {
                    /** 过滤文件 过滤需要检测的文件 */
                    let __reg = isExclude ? !regExp.test(localdir) : regExp.test(localdir);
                    if (__reg) {
                        fileList.push(localdir);
                    }
                }
            }
        }
    };
    handle(dir);
    return fileList;
}

function getAllFilesBody(options) {
    let fileList = getFileList(options, true);
    let allString = "";
    for (let j = 0; j < fileList.length; j++) {
        const filePath = fileList[j];
        if (fs.existsSync(filePath)) {
            const fileBody = fs.readFileSync(filePath, "utf-8");
            allString += `\r\n ${fileBody}`;
        }
    }
    return JSON.stringify(allString, null, 4);
}

function getAllTestFilesPath(options) {
    let fileList = getFileList(options, false);
    const testPrefix = options.testPrefix;

    for (let s = 0; s < fileList.length; s++) {
        fileList[s] = {
            source: fileList[s],
            regexp: fileList[s].substring(fileList[s].indexOf(testPrefix))
        };
    }
    return fileList;
}

function diffNoUsedFiles(allString, allTestFilesPaths) {
    let outputList = [];
    for (k = 0; k < allTestFilesPaths.length; k++) {
        const val = allTestFilesPaths[k];
        const regExp = new RegExp(val.regexp);
        if (!regExp.test(allString)) {
            outputList.push(val.source);
        }
    }
    return JSON.stringify(outputList, null, 4);
}

exports.getAllFilesBody = getAllFilesBody;
exports.getAllTestFilesPath = getAllTestFilesPath;
exports.diffNoUsedFiles = diffNoUsedFiles;
