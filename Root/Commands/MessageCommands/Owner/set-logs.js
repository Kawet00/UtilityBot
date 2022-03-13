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

        let channelFetched = message.guild.channels.cache.get(args[0]);
        if (!channelFetched || channelFetched.type !== "text") return message.reply({
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

        channelFetched = message.guild.channels.cache.find(c => c.id, channel.id);

        db.set(`logs_${message.guild.id}`, channelFetched.id)
        channelFetched.send({
            embeds: [
                new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[1]}`)
            .setColor(colors.VERT)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.setL[1], channelFetched, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField('\u200B', '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })
        
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
    }
}