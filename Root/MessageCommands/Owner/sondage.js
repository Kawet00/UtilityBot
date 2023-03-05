const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')

function dateFormat(date) {
    return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
    })
}

module.exports = {
    name: 'sondage',
    description: 'none',
    aliases: ["poll", "s"],
    AllUserPermissions: ["Administrator"],
    cooldown: 600000,

    run: async (client, message, args) => {
        let lang = client.langs.get(getLang(message.guild.id) || 'en')

        let channelM = message.mentions.channels.first();
        if (args.slice(1) !== channelM) ;
        if (!channelM) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        const duration = parseDuration(args[1])
        if (!duration) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[1]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        let sondage = args.slice(2).join(" ");
        if (!sondage) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[2]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        channelM.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${lang.commands.owner.poll[3]} ${message.author} \n\n ${sondage}`)
                    .setTitle(lang.commands.owner.poll[4])
                    .setFooter({
                        text: `${lang.commands.owner.poll[5].replace('{DURATION}', humanizeDuration(duration, {language: lang}))}  •  © ${client.user.username}`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        }).then(msg => {
            msg.react("✅")
            msg.react("❌")

            setTimeout(() => {
                message.delete();
            }, 300)

            let logsC = getLogsChannel(message.guild.id);
            if (logsC === null) return;
            else message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[6]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .addFields(
                            {name: lang.commands.owner.poll[7], value: sondage, inline: true},
                            {name: lang.commands.ownera[1], value: message.author, inline: true},
                            {name: `\u200B`, value: '\u200B'},
                            {name: lang.commands.owner.poll[8], value: humanizeDuration(duration, {language: lang})},
                            {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                        )
                ]
            });
        });
        setTimeout(() => {
            let member = message.author;
            member.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[9]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .addFields({
                            name: lang.commands.owner.poll[9],
                            value: `${sondage}`
                        })
                ]
            })
        }, duration)
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.VERT)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[10]}`)
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })
    }
}