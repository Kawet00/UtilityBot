const colors = require('../../../Storage/json/colors.json')

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

    name: "clear",
    description: "clears message",
    aliases: ['cl', 'purge'],
    userPermissions: ["MANAGE_MESSAGES"],
    clientPermissions: ["MANAGE_MESSAGES"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
        if (args[0] < 5) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
          if (args[0] > 100) return message.reply({
              embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
              ]
            })
        try {
            message.channel.bulkDelete(parseInt(args[0])+parseInt(1)).then(() => {
                message.channel.send({
                    embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.autre.cool_pika} ┇ \`${args[0]}\` ${lang.commands.mods.clear[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setColor(colors.VERT)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    ]
                })
                let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                client.channels.cache.get(logsC).send({
                    embeds: [
                        new container.Discord.MessageEmbed()
                    .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[4]}`)
                    .setColor(colors.EPINGLE)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .addField(lang.commands.mods.clear[5], args[0], true)
                    .addField(lang.commands.modsa[0], message.author, true)
                    .addField(lang.commands.modsa[5], message.channel.name)
                    .addField(`\u200B`, '\u200B')
                    .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    ]
                });
            })
        } catch {
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.mods.clear[6]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            })
        };
    }
}