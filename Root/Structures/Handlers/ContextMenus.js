const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Interactions/ContextMenus`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const ContextMenu = require(File);
        if (ContextMenu.ignore) return;
        client.contextMenus.set(ContextMenu.name, ContextMenu)
    })
    let promise = Promise.resolve()
    ScannedFiles.forEach(async function (File) {
        promise = promise.then(async function () {
            const interval = 5000;
            if (fs.statSync(File).isDirectory()) return;
            const ContextMenu = require(File);
            if (ContextMenu.ignore) return;

            if (ContextMenu.guilds && Array.isArray(ContextMenu.guilds)) ContextMenu.guilds.forEach(guildID => {
                (async () => {
                    const guild = DiscordClient.guilds.cache.get(guildID) ?? await client.guilds.fetch(guildID)
                    const verifier = guild.commands.cache.find(x => x.name == ContextMenu.name)
                    if (verifier) await guild.commands.edit(verifier.id, {
                        name: ContextMenu.name,
                        options: ContextMenu.options ?? [],
                        type: ContextMenu.type
                    })
                    else await guild.commands.create({
                        name: ContextMenu.name,
                        options: ContextMenu.options ?? [],
                        type: ContextMenu.type
                    })
                })()
            })
            else {
                const verifier = client.application.commands.cache.find(x => x.name == ContextMenu.name)
                if (verifier) await client.application.commands.edit(verifier.id, {
                    name: ContextMenu.name,
                    options: ContextMenu.options ?? [],
                    type: ContextMenu.type
                })
                else await client.application.commands.create({
                    name: ContextMenu.name,
                    options: ContextMenu.options ?? [],
                    type: ContextMenu.type
                })
            }

            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            })
        })
    })
}