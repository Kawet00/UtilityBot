
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
    aliases: ["s-g"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 600000,

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[1]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }

        if (isNaN(ms(giveawayDuration))) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[2]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[3]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[4]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
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
                giveaway: `${container.Emotes.autre.giveaway_2} **${lang.commands.owner.startG[5]}** ${container.Emotes.autre.giveaway_2}`,
                giveawayEnded: `${container.Emotes.autre.giveaway_2} **${lang.commands.owner.startG[6]}** ${container.Emotes.autre.giveaway_2}`,
                timeRemaining: `${lang.commands.owner.startG[7]} : **{duration}**!`,
                inviteToParticipate: `${lang.commands.owner.startG[8].replace('{EMOJI}', container.Emotes.autre.giveaway_1)}`,
                winMessage: `${container.Emotes.blob.blob_b} GG, {winners}! ${lang.commands.owner.startG[9]} **{prize}**!`,
                embedFooter: `© ${client.user.username}`,
                noWinner: `${container.Emotes.blob.blob_g} ${lang.commands.owner.startG[10]} (**${giveawayPrize}**) !`,
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
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[16]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.startG[17], giveawayPrize, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField(lang.commands.owner.startG[18], giveawayNumberWinners, true)
            .addField(`\u200B`, '\u200B')
            .addField(lang.commands.owner.startG[19], humanizeDuration(giveawayDuration, { language: 'fr' }), true)
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                ]
            });

        message.channel.send(`${lang.commands.owner.startG[20]} ${giveawayChannel} !`);

    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Start Giveaways')
                .addField('Erreur', `\`\`\`${e}\`\`\``)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setColor(colors.PERSO)
            ]
        })
        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${lang.commands.problem[0]}`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        })
        console.log(e)
      }
    }
}