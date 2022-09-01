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

        try {

        if (!args[0]) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[0]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
            })
            if(isNaN(args[0])) return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[7]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            })
        if (args[0] < 5) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[1]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
        setTimeout(() =>{
            message.delete();
          }, 300)
        })
          if (args[0] > 99) return message.reply({
              embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[2]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
              ]
            }).then(() => {
        setTimeout(() =>{
            message.delete();
          }, 300)
            })
        try {
            message.channel.bulkDelete(parseInt(args[0])+parseInt(1)).then(() => {
                message.channel.send({
                    embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.autre.cool_pika} ┇ \`${args[0]}\` ${lang.commands.mods.clear[3]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                    .setColor(colors.VERT)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    ]
                }).then(m => {
                    setTimeout(() => {
                    m.delete()
                    }, 3000)
                })
                let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                message.guild.channels.cache.get(logsC).send({
                    embeds: [
                        new container.Discord.MessageEmbed()
                    .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[4]}`)
                    .setColor(colors.EPINGLE)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .addField(lang.commands.mods.clear[5], args[0], true)
                    .addField(lang.commands.modsa[0], `<@!${message.author.id}>`, true)
                    .addField(lang.commands.modsa[5], `<#${message.channel.id}>`)
                    .addField(`\u200B`, '\u200B')
                    .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                    ]
                });
            })
        } catch (e) {
            console.log(e)
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.clear[6]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
        setTimeout(() =>{
            message.delete();
          }, 300)
        })
        };
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Clear')
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