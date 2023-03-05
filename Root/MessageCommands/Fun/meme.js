const fetch = require('node-fetch');
const colors = require('../../Storage/json/colors.json');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'meme',
    aliases: ['me'],
    cooldown: 10000,

    run: async (client, message) => {
        let res = await fetch('https://meme-api.herokuapp.com/gimme');
        res = await res.json();
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(res.title)
                    .setImage(res.url)
                    .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    .setColor(colors.PERSO)
            ]
        });
    }
};