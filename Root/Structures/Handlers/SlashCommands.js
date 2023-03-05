const fs = require("fs");
const FileScanner = require('node-recursive-directory');

module.exports = async (client, RootPath) => {
    const ScannedFiles = await FileScanner(`${RootPath}/Root/Interactions/SlashCommands`)
    ScannedFiles.forEach(File => {
        if (fs.statSync(File).isDirectory()) return;
        const SlashCommand = require(File);
        if (SlashCommand.ignore) return;
        client.slashCommands.set(SlashCommand.name, SlashCommand)
    })
    let promise = Promise.resolve()
    ScannedFiles.forEach(async function (File) {
        promise = promise.then(async function () {
            const interval = 5000;
            if (fs.statSync(File).isDirectory()) return;
            const slashCommand = require(File);
            if (slashCommand.ignore) return;

            if (slashCommand.guilds && Array.isArray(slashCommand.guilds)) slashCommand.guilds.forEach(guildID => {
                (async () => {
                    const guild = DiscordClient.guilds.cache.get(guildID) ?? await DiscordClient.guilds.fetch(guildID)
                    const verifier = guild.commands.cache.find(x => x.name == slashCommand.name)
                    await guild.commands.delete()
                    if (verifier) await guild.commands.edit(verifier.id, {
                        name: slashCommand.name,
                        description: slashCommand.description ?? "None",
                        options: slashCommand.options ?? [],
                        type: slashCommand.type
                    })
                    else await guild.commands.create({
                        name: slashCommand.name,
                        description: slashCommand.description ?? "None",
                        options: slashCommand.options ?? [],
                        type: slashCommand.type
                    })
                })()
            })
            else {
                const verifier = client.application.commands.cache.find(x => x.name == slashCommand.name)
                if (verifier) await client.application.commands.edit(verifier.id, {
                    name: slashCommand.name,
                    description: slashCommand.description ?? "None.",
                    options: slashCommand.options ?? [],
                    type: slashCommand.type
                })
                else await client.application.commands.create({
                    name: slashCommand.name,
                    description: slashCommand.description ?? "None.",
                    options: slashCommand.options ?? [],
                    type: slashCommand.type
                })
            }

            return new Promise(function (resolve) {
                setTimeout(resolve, interval);
            })
        })
    })
}