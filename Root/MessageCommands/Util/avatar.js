const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const axios = require('axios');
const {token} = require('../../Storage/json/Config.json');

module.exports = {
    name: "avatar",
    description: "Brodcast someone's avatar",
    aliases: ["av"],
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let member = message.mentions.users.first() || message.author

        let avatar = member.displayAvatarURL({dynamic: true, size: 512})
        axios.get(`https://discord.com/api/users/${member.id}`, {
            headers: {
                Authorization: `Bot ${token}`,
            },
        })
            .then((res) => {
                const {banner, accent_color} = res.data;

                if (banner) {
                    const extension = banner.startsWith("a_") ? ".gif" : ".png";
                    const url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=4096`
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({name: member.username, iconURL: avatar})
                                .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[0].replace('{USER}', member)}`)
                                .setThumbnail(avatar)
                                .setImage(url)
                                .setColor(colors.PERSO)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                } else if (accent_color) {
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({name: member.username, iconURL: avatar})
                                .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[1].replace('{USER}', member)}`)
                                .setImage(avatar)
                                .setColor(accent_color)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                } else {
                    message.reply({
                        embeds: [
                            new EmbedBuilder()
                                .setAuthor({name: member.username, iconURL: avatar})
                                .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.avatar[2].replace('{USER}', member)}`)
                                .setThumbnail(avatar)
                                .setColor(colors.PERSO)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                }
            })
    }
}