const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json')
const emotes = require('../../Storage/json/emotes.json')
const fetch = require('node-fetch');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'fox',
    aliases: ["f"],
    cooldown: 10000,

    run: async (client, message) => {
        let res = await fetch('https://randomfox.ca/floof');
        res = await res.json();

        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(lang.commands.fun.animaux[0])
                    .setURL(res.link)
                    .setDescription(`${emotes.autre.fox}`)
                    .setImage(res.image)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}