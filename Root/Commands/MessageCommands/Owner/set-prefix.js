const db = require('quick.db');

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
    name: 'set-prefix',
    aliases: ["s-p"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }

        if (args[1]) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.owner.setP[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setColor(colors.RED)
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }
        if (args.join("") === "u!" || args.join("") === 'delete') {
            db.delete(`prefix_${message.guild.id}`)

             message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.owner.setP[4]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.VERT)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })

            let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                client.channels.cache.get(logsC).send({
                    embeds: [
                        new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[2]}`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addField(lang.commands.owner.setP[3], `\`u!\``, true)
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    ]
                });
        }
        if (args[0].length > 5) {
            return await message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[5]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setColor(colors.EPINGLE)
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }
        db.set(`prefix_${message.guild.id}`, args[0])

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.setP[6]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.VERT)
            .setTimestamp()
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        let logsC = db.get(`logs_${message.guild.id}`)
        if (!logsC) return;
        client.channels.cache.get(logsC).send({
            embeds: [
                new container.Discord.MessageEmbed()
        .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[2]}`)
        .setColor(colors.EPINGLE)
         .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
        .setTimestamp()
        .addField(lang.commands.owner.setP[3], `\`${container.Prefix}\``, true)
        .addField(lang.commands.ownera[1], message.author, true)
        .addField(`\u200B`, '\u200B')
        .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        });
    }
}