const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json');
function dateFormat(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
      })
    }

module.exports = {
    name: "set-welcome",
    onlyUsers: ["509765051435974692", "691644619758370846"],
    aliases: ["s-we"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        let channel = message.mentions.channels.first()
        
        if (args[0] === "delete") {
            db.delete(`welchannel_${message.guild.id}`, channel.id)
                let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                client.channels.cache.get(logsC).send({
                    embeds: [
                        new container.Discord.MessageEmbed()
                    .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setW[0]}`)
                    .setColor(colors.EPINGLE)
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
                        .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.owner.setW[1]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                        .setTimestamp()
                    ]
                })
        }

        if (!channel) {
            return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setW[2]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                    .setTimestamp()
            ]
            })
        }

        db.set(`welchannel_${message.guild.id}`, channel.id)
        
        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.owner.setW[4]}`)
                .setColor(colors.green_light)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })

            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setW[3]}`)
                .setColor(colors.VERT)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(lang.commands.ownera[2], channel, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
    }
}