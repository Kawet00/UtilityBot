const emotes = require('../../../Storage/json/emotes.json')
const ms = require('ms');
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db');
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
    onlyUsers: ["509765051435974692", "691644619758370846"],
    aliases: ["s-g"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 600000,

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        if (isNaN(ms(giveawayDuration))) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[4]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        client.giveawaysManager.start(giveawayChannel, {
            time: ms(giveawayDuration),
            prize: `${lang.commands.owner.startG[20]} ${giveawayPrize}`,
            winnerCount: giveawayNumberWinners,
            hostedBy: config.hostedBy ? message.author : null,
            messages: {
                giveaway: `${config.container.Emotes.giveaway_2} **${lang.commands.owner.startG[5]}** ${config.container.Emotes.giveaway_2}`,
                giveawayEnded: `${config.container.Emotes.giveaway_2} **${lang.commands.owner.startG[6]}** ${config.container.Emotes.giveaway_2}`,
                timeRemaining: `${lang.commands.owner.startG[7]} : **{duration}**!`,
                inviteToParticipate: `${lang.commands.owner.startG[8].replace('{EMOJI}', config.container.Emotes.giveaway_1)}`,
                winMessage: `${config.container.Emotes.blob.blob_b} GG, {winners}! ${lang.commands.owner.startG[9]} **{prize}**!`,
                embedFooter: `© ${client.user.username}`,
                noWinner: `${config.container.Emotes.blob.blob_g} ${lang.commands.owner.startG[10]} (**${giveawayPrize}**) !`,
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
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[16]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.startG[17], giveawayPrize, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField(lang.commands.owner.startG[18], giveawayNumberWinners, true)
            .addField(`\u200B`, '\u200B')
            .addField(lang.commands.owner.startG[19], humanizeDuration(giveawayDuration, { language: 'fr' }), true)
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });

        message.channel.send(`${lang.commands.owner.startG[20]} ${giveawayChannel} !`);

    }
}