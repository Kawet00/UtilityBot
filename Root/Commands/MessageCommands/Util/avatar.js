
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')
const axios = require('axios')
const { Util } = require('discord.js')

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",
    aliases: ["av"],
    cooldown: 5000,

    run: async(client, message, args, container) => {

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({ dynamic: true, size: 512 })
        axios.get(`https://discord.com/api/users/${member.id}`, {
            headers: {
                Authorization: `Bot ${container.Config.token}`,
            },
        })
        .then((res) => {
            const { banner, accent_color } = res.data;

        if(banner) {
            const extension = banner.startsWith("a_") ? ".gif" : ".png";
            const url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=4096`
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[0].replace('{USER}', member)} \n\n[${lang.commandsa[0]}](https://eternode.ga/)`)
            .setThumbnail(avatar)
            .setImage(url)
            .setColor(colors.PERSO)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
    } else if(accent_color) {
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[1].replace('{USER}', member)} \n\n[${lang.commandsa[0]} ](https://eternode.ga/)`)
            .setImage(avatar)
            .setColor(accent_color)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
    } else {
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setAuthor({name: member.username, iconURL: avatar})
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[2].replace('{USER}', member)} \n\n[${lang.commandsa[0]} ](https://eternode.ga/)`)
            .setThumbnail(avatar)
            .setColor(colors.PERSO)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
    }
})
} catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Avatar')
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