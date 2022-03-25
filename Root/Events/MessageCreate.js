const db = require('quick.db')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
    name: "messageCreate",
    run: async(message, client, container) => {
        if (message.author.bot || message.channel.type == 'DM') return;
        let Prefix = db.get(`prefix_${message.guild.id}`) || "u!"
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en'); 

        const loadCommandOptions = require("../Structures/CommandOptions/loadCommandOptions")

        if (message.content === `<@!787306158301511691>`) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${emotes.autre.UT_LOGO} ┇ ${lang.events.MsgCreate[0].replace('{PREFIX}', Prefix).replace('{PREFIX}', Prefix)}`)
                .setColor(colors.PERSO)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            ]
        });

            if (!message.content.toLowerCase().startsWith(Prefix)) return;

            const cmdName = message.content.toString().toLowerCase().slice(Prefix.length).trim().split(" ")[0]
            const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.aliases.get(cmdName))

            if (!command) return;
            if (command.allowBots) loadCommandOptions(client, message, command, false)
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false)
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false)
    }
    }