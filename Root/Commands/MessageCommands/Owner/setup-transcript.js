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
    name: "setup-transcript",
    aliases: ["su-trans"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let channel = message.mentions.channels.first()

        if (args[0] === "delete") {
            let logsC = db.get(`logs_${message.guild.id}`)
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.pepe.pepe_s} ┇ `)
                .setColor(colors.VERT)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })
            if (!logsC) return;
            message.guild.channels.cache.get(logsC.id).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ `)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        })
        }

        if (!channel) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ \n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        db.set(`ticket.${message.guild.id}.TranscriptChannel`, channel.id)
            let logsC = db.get(`logs_${message.guild.id}`)
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.VERT)
                .setDescription(`${container.Emotes.blob.blob_b} ┇  (**${channel}**)\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setTimestamp()
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })

            if (!logsC) return;
            message.guild.channels.cache.get(logsC.id).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ `)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addField(lang.commands.ownera[1], message.author.username + '#' + message.author.discriminator, true)
                .addField(lang.commands.ownera[2], channel.name, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Setup Transcript')
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