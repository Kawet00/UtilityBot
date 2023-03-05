const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Interactions/SelectMenus`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const SelectMenu = require(File)
        if (SelectMenu.ignore) return;
        else
        client.selectMenus.set(SelectMenu.name, SelectMenu)
    });
}