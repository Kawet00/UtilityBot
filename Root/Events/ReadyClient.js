const {ActivityType} = require("discord.js");
const chalk = require("chalk");

module.exports = {
    name: "ready",
    runOnce: true,
    run: async (client) => {

        const activitys = [
            "by Elpistolero13",
            "the v2.4.0",
            "on utilitybot.me",
            "u! help",
            `on ${client.guilds.cache.size} servers`
        ]


        setInterval(function () {
            const activity = activitys[Math.floor(Math.random() * activitys.length)];

            client.user.setActivity(activity, {
                type: ActivityType.Streaming,
                url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            })
        }, 5000)

        console.log(chalk.bold.green(`Logging into ${client.user.tag}.`))
        if (client.messageCommands.size > 0) console.log(chalk.bold.blue("[MessageCommands]", `Loading ${client.messageCommands.size} MessageCommands with ${client.messageCommands_Aliases.size} Aliases.`))
        if (client.events.size > 0) console.log(chalk.bold.yellow("[EventManager]", `Loading ${client.events.size} Events.`))
        if (client.buttonCommands.size > 0) console.log(chalk.bold.magenta("[ButtonCommands]", `Loading ${client.buttonCommands.size} ButtonCommands.`))
        if (client.selectMenus.size > 0) console.log(chalk.hex("#5B5F13").bold("[SelectMenus]", `Loading ${client.selectMenus.size} SelectMenus.`))
        if (client.slashCommands.size > 0) console.log(chalk.hex("#3535FF").bold("[SlashCommands]", `Loading ${client.slashCommands.size} SlashCommands.`))
        if (client.contextMenus.size > 0) console.log(chalk.hex("#44FF00").bold("[ContextMenus]", `Loading ${client.contextMenus.size} ContextMenus.`))
        if (client.modalForms.size > 0) console.log(chalk.hex("#067A00").bold("[ModalForms]", `Loading ${client.modalForms.size} Modal Forms.`))
        if (client.langs.size > 0) console.log(chalk.hex("#7129aa").bold("[Langs]", `Loading ${client.langs.size} languages.`))
    }
}