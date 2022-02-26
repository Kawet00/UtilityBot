const colors = require('../../../Storage/json/colors.json')
const emotes = require('../../../Storage/json/emotes.json')
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
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermissions: ["MANAGE_MESSAGES"],
    clientPermissions: ["MANAGE_MESSAGES"],

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        if (!args[0]) return message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })
        if (args[0] < 5) return message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })
          if (args[0] > 100) return message.reply({
              embeds: [
            new Discord.MessageEmbed()
            .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
              ]
            })
        try {
            message.channel.bulkDelete(parseInt(args[0])+parseInt(1)).then(() => {
                message.channel.send({
                    embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`${emotes.autre.cool_pika} ┇ \`${args[0]}\` ${lang.commands.mods.clear[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setColor(colors.VERT)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                    .setTimestamp()
                    ]
                })
                let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                client.channels.cache.get(logsC).send({
                    embeds: [
                        new Discord.MessageEmbed()
                    .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[4]}`)
                    .setColor(colors.EPINGLE)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
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
                new Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.clear[6]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        };
    }
}