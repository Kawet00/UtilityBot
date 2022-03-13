const colors = require('../../../Storage/json/colors.json')

const parseDuration = require('parse-duration')
const humanizeDuration = require('humanize-duration')
const db = require('quick.db');
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
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 600000,

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        let channelM = message.mentions.channels.first();
        if (args.slice(1) !== channelM);
        if (!channelM) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        const duration = parseDuration(args[1])
        if (!duration) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
    }).then(() => {
        setTimeout(() =>{
          message.delete();
        }, 300)
    })

        let sondage = args.slice(2).join(" ");
        if (!sondage) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        channelM.send({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setDescription(`${lang.commands.owner.poll[3]} ${message.author} \n\n ${sondage}\n\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTitle(lang.commands.owner.poll[4])
            .setFooter({ text: `${lang.commands.owner.poll[5].replace('{DURATION}', humanizeDuration(duration, { language: 'en' }))}  •  © ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        }).then(msg => {
            msg.react("✅")
            msg.react("❌")
            
                setTimeout(() =>{
                  message.delete();
                }, 300)

            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[6]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.poll[7], sondage, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField(`\u200B`, '\u200B')
            .addField(lang.commands.owner.poll[8], humanizeDuration(duration, { language: lang }))
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
        });
        setTimeout(() => {
            let member = message.author;
            member.send({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[9]}`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addFields({
                    name: lang.commands.owner.poll[9],
                    value: `${sondage}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                })
            ]
        })
        }, duration)
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.VERT)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.poll[10]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })
    
    }
}