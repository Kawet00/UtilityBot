const emotes = require("../../../Storage/json/emotes.json");
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
    name: 'set-logs',
    description: 'flm',
    aliases: ["s-l"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let channelFetched = message.mentions.channels.first()

        if (!channelFetched || channelFetched.type !== "GUILD_TEXT") return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setLo[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setColor(colors.EPINGLE)
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        channelFetched = message.guild.channels.cache.find(c => c.id)

        db.set(`logs_${message.guild.id}`, channelFetched)
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.VERT)
            .setDescription(`${
                container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })
        client.channels.cache.get(args[0].slice(2, -1)).send({
            embeds: [
                new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[1]}`)
            .setColor(colors.VERT)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            /*.addField(lang.commands.owner.setLo[1], channelFetched)
            .addField(lang.commands.ownera[1], message.author)*/
            .addField('\u200B', '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        })
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Set Logs')
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