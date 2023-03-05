const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {EmbedBuilder} = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: 'dog',
    aliases: ["d"],
    cooldown: 10000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')
        let res = await fetch('https://some-random-api.ml/img/dog');
        res = await res.json();

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(lang.commands.fun.animaux[0])
                    .setURL(res.link)
                    .setDescription(`${emotes.autre.dog}`)
                    .setImage(res.link)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}