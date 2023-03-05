const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Interactions/ButtonCommands`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const Button = require(File)
        if (Button.ignore) return;
        else
        client.buttonCommands.set(Button.name, Button)
    });
}