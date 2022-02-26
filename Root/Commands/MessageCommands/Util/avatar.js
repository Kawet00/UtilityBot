const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')
const axios = require('axios')

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",
    onlyUsers: ["509765051435974692", "691644619758370846"],
    aliases: ["av"],
    cooldown: 5000,

    run: async(client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({ dynamic: true, size: 512 })
        axios.get(`https://discord.com/api/users/${member.id}`, {
            headers: {
                Authorization: `Bot ${ROOT.config.token}`,
            },
        })
        .then((res) => {
            const { banner, accent_color } = res.data;

        if(banner) {
            const extension = banner.startsWith("a_") ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=4096`
        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.fun.avatar[0].replace('{USER}', member.username)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setThumbnail(avatar)
            .setImage(url)
            .setColor(colors.PERSO)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        });
    } else if(accent_color) {
        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.fun.avatar[1].replace('{USER}', member.username)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setImage(avatar)
            .setColor(accent_color)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        });
    } else {
        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.fun.avatar[2].replace('{USER}', member.username)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setThumbnail(avatar)
            .setColor(colors.PERSO)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        });
    }
})
    }
}