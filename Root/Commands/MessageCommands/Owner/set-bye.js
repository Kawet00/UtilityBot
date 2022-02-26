const db = require('quick.db');
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
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
    name: "set-bye",
    aliases: ["s-by"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        let channel = message.mentions.channels.first()

        if (args[0] === "delete") {
            db.delete(`byechannel_${message.guild.id}`, channel.id)
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setB[4]}`)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        });

            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.owner.setB[0]}`)
                .setColor(colors.VERT)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })
        }

        if (!channel) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setB[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        })

        db.set(`byechannel_${message.guild.id}`, channel.id)
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setB[3]}`)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(lang.commands.ownera[2], channel, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.VERT)
            .setDescription(`${emotes.blob.blob_b} ┇ ${lang.commands.owner.setB[2]} (**${channel}**)\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        })
    }
}