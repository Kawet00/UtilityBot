const Discord = require("discord.js")
const {
    path,
    config,
    emotes,
    colors
} = require("../../../index")
const db = require('quick.db')
module.exports = async function (client, message, command, isInteraction, interactionType) {
    if (!command) return;
    const dbprefix = db.get(`prefix_${message.guild.id}`) || config.prefix;
    const container = {
        RootPath: path,
        Config: config,
        Discord: Discord,
        Emotes: emotes,
        Colors: colors,
        Prefix: dbprefix
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
    else {
        if (isInteraction) command.run(client, message, container)
        else {
            container.Config.prefix.forEach(prefix => {
                if (!message.content.toLowerCase().startsWith(prefix)) return;
                const cmdName = message.content.trim().toLowerCase().slice(prefix.length).trim().split(" ")[0]
                const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.messageCommands.aliases.get(cmdName))
                if (!command) return;
                let args = message.content.slice(prefix.length).trim()
                if (args.toLowerCase().startsWith(cmdName)) args = args.slice(cmdName.length).trim().split(" ")
                command.run(client, message, args, container)
            })
        }
    }
}