const Discord = require("discord.js")
const {
    path,
    config,
    emotes,
    colors
} = require("../../../index")
const db = require('../../Storage/db/Models')

module.exports = async function (client, message, command, isInteraction, interactionType) {
    if (!command) return;
    const guildData = await db.GuildSettings.findOne({GuildID: message.guild.id})
    const dbprefix = guildData?.prefix
    const dblang = client.langs.get(guildData?.lang)
    const container = {
        RootPath: path,
        Config: config,
        Discord: Discord,
        Emotes: emotes,
        Colors: colors,
        Prefix: dbprefix,
        db,
        Lang: dblang
    }
    if (await require("./Cooldown")(client, message, command, isInteraction, interactionType, Discord)) return;
    else if (await require("./OwnerOnly")(client, message, command, Discord)) return;
    else if (await require("./UserPermissions")(client, message, command, Discord)) return;
    else if (await require("./ClientPermissions")(client, message, command, Discord)) return;
    else if (await require("./AnyUserPermissions")(client, message, command, Discord)) return;
    else if (await require("./AnyClientPermissions")(client, message, command, Discord)) return;
    else if (await require("./RequiredAnyRole")(client, message, command, Discord)) return;
    else if (await require("./RequiredRoles")(client, message, command, Discord)) return;
    else if (await require("./OnlyChannels")(client, message, command, Discord)) return;
    else if (await require("./OnlyGuilds")(client, message, command, Discord)) return;
    else if (await require("./OnlyUsers")(client, message, command, Discord)) return;
    else if (await require("./VoiceChannel")(client, message, command, Discord)) return;
    else if (await require("./NsfwChannel")(client, message, command, Discord)) return;
    else {
        if (isInteraction) command.run(client, message, container)
        else {
                if (!message.content.toLowerCase().startsWith(dbprefix)) return;
                const cmdName = message.content.trim().toLowerCase().slice(dbprefix.length).trim().split(" ")[0]
                const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.aliases.get(cmdName))
                if (!command) return;
                let args = message.content.slice(dbprefix.length).trim()
                if (args.toLowerCase().startsWith(cmdName)) args = args.slice(cmdName.length).trim().split(" ")
                command.run(client, message, args, container)
        }
    }
}