const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/MessageCommands`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const MessageCommand = require(File);
        if (MessageCommand.ignore) return;

        client.messageCommands.set(MessageCommand.name, MessageCommand);
        if (MessageCommand.aliases) MessageCommand.aliases.forEach(Alias => {
            client.messageCommands_Aliases.set(Alias, MessageCommand.name);
        });
    });
}