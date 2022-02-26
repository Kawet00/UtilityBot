const emotes = require("../../../Storage/json/emotes.json")
const colors = require("../../../Storage/json/colors.json")
const db = require('quick.db');

module.exports = {
    name: "report",
    onlyUsers: ["509765051435974692", "691644619758370846"],
    cooldown: 100000,

    run: async(client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        let type = "bug" || "other" || "latency" || "ping" || "autre";
        type = args[0]
        if (!type) return message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.report[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })

        let co = args.slice(1).join(" ")
        if (!co) return message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.report[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
            })

        let g = client.guilds.cache.get(ROOT.config.supporGuild)
        let c = g.channels.cache.get(ROOT.config.reportChannel)

        try {
            c.send({
                embeds: [
                    new Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription(`**${message.member.user.tag}** ${lang.commands.util.report[2]}`)
            .addFields({
                name: lang.commands.util.report[3],
                value: message.author.id,
                inline: false,
            }, {
                name: "\u200B",
                value: "\u200B",
                inline: false,
            }, {
                name: lang.commands.util.report[4],
                value: message.guild.name,
                inline: true,
            }, {
                name: lang.commands.util.report[5],
                value: message.guild.id,
                inline: true,
            }, {
                name: "\u200B",
                value: "\u200B",
                inline: false,
            }, {
                name: lang.commands.util.report[6],
                value: type,
                inline: false,
            }, {
                name: lang.commands.util.report[7],
                value: `${co}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                inline: false
            })
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
                ]
            }).then(() => {
                message.reply({
                    embeds: [
                    new Discord.MessageEmbed()
                    .setColor(colors.VERT)
                    .setDescription(`${config.emotes.pepe.pepe_s} ┇ ${lang.commands.util.report[8]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                    .setTimestamp()
                    ]
                })
            })
        } catch (err) {
            message.reply({
                embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${config.emotes.autre.attention} ┇ ${lang.commands.util.report[9].replace('{SERVER}', "[support](https://discord.gg/BT4SyHUM5z)")}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }
    }
}