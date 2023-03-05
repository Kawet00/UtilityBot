const fs = require("fs"),
    FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Events`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const Event = require(File);
        if (Event.ignore) return;
        client.events.set(Event.name, Event)

        if (Event.isCustom) Event.run(client, RootPath);
        else {
            if (Event.runOnce) client.once(Event.name, (...args) => Event.run(...args, client, RootPath));
            else client.on(Event.name, (...args) => Event.run(...args, client, RootPath));
        }
    });
}