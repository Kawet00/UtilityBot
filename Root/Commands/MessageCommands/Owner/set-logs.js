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
    onlyUsers: ["509765051435974692", "691644619758370846"],
    description: 'flm',
    aliases: ["s-l"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        let channelFetched = message.guild.channels.cache.find(c => c.id, channel.id);
        if (!channelFetched || channelFetched.type !== "text") return message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setLo[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setColor(colors.EPINGLE)
            ]
        });

        db.set(`logs_${message.guild.id}`, channelFetched.id)
        channelFetched.send({
            embeds: [
                new Discord.MessageEmbed()
            .setTitle(`${emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[1]}`)
            .setColor(colors.VERT)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.setL[1], channelFetched, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField('\u200B', '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        });
        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.VERT)
            .setDescription(`${
                emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })
    }
}