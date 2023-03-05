const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/colors.json');
const fetch = require('node-fetch');
const { EmbedBuilder } = require('discord.js');
const {supportGuild, reportChannel} = require('../../Storage/json/Config.json');

module.exports = {
    name: 'bird',
    aliases: ["bi"],
    cooldown: 10000,

    run: async (client, message) => {
            let res = await fetch('https://some-random-api.ml/img/bird');
            res = await res.json();

            let lang = client.langs.get(await getLang(message.guild.id) || 'en');

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.fun.animaux[0])
                        .setURL(res.link)
                        .setDescription(`${emotes.autre.bird}`)
                        .setImage(res.link)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            });
    }
}