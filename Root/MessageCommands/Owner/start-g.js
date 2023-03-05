const ms = require('ms');
const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
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
    name: 'start-g',
    aliases: ["s-g"],
    AllUserPermissions: ["Administrator"],
    cooldown: 600000,

    run: async (client, message, args) => {
        let lang = client.langs.get(getLang(message.guild.id) || 'en');

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[0]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[1]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }

        if (isNaN(ms(giveawayDuration))) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[3]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[4]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }

        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: `${lang.commands.owner.startG[20]} ${giveawayPrize}`,
            winnerCount: giveawayNumberWinners,
            hostedBy: config.hostedBy ? message.author : null,
            messages: {
                giveaway: `${emotes.autre.giveaway_2} **${lang.commands.owner.startG[5]}** ${emotes.autre.giveaway_2}`,
                giveawayEnded: `${emotes.autre.giveaway_2} **${lang.commands.owner.startG[6]}** ${emotes.autre.giveaway_2}`,
                timeRemaining: `${lang.commands.owner.startG[7]} : **{duration}**!`,
                inviteToParticipate: `${lang.commands.owner.startG[8].replace('{EMOJI}', emotes.autre.giveaway_1)}`,
                winMessage: `${emotes.blob.blob_b} GG, {winners}! ${lang.commands.owner.startG[9]} **{prize}**!`,
                embedFooter: `© ${client.user.username}`,
                noWinner: `${emotes.blob.blob_g} ${lang.commands.owner.startG[10]} (**${giveawayPrize}**) !`,
                hostedBy: `${lang.commands.owner.startG[11]} {user}`,
                winners: lang.commands.owner.startG[12],
                endedAt: lang.commands.owner.startG[13],
                units: {
                    seconds: lang.commands.owner.startG[21],
                    minutes: "minutes",
                    hours: lang.commands.owner.startG[14],
                    days: lang.commands.owner.startG[15],
                    pluralS: false
                }
            }
        });
        let logsC = getLogsChannel(message.guild.id)
        if (logsC === null) return;
        else message.guild.channels.cache.get(logsC).send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[16]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .addFields(
                        {name: lang.commands.owner.startG[17], value: giveawayPrize, inline: true},
                        {name: lang.commands.ownera[1], value: message.author, inline: true},
                        {name: lang.commands.owner.startG[18], value: giveawayNumberWinners, inline: true},
                        {name: `\u200B`, value: '\u200B'},
                        {
                            name: lang.commands.owner.startG[19],
                            value: humanizeDuration(giveawayDuration, {language: lang}),
                            inline: true
                        },
                        {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                    )
            ]
        });
        message.channel.send(`${lang.commands.owner.startG[20]} ${giveawayChannel} !`);
    }
}