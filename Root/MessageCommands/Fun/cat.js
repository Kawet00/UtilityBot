const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch')

module.exports = {

    name: 'cat',
    aliases: ['c'],
    cooldown: 5000,

    run: async (client, message) => {
        let res = await fetch('https://api.thecatapi.com/v1/images/search');
        res = (await res.json())[0].url;

        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(lang.commands.fun.animaux[0])
                    .setURL(res)
                    .setDescription(`${emotes.autre.cat}`)
                    .setImage(res)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}