const request = require('node-superfetch');
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const config = require('../../Storage/json/Config.json');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'giphy',
    aliases: ["gif"],

    run: async (client, message, [...query]) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        if (!query) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${lang.commands.fun.gif[0]}`)
                    .setTimestamp()
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.EPINGLE)
            ]
        })
        const {body} = await request
            .get('http://api.giphy.com/v1/gifs/search')
            .query({
                q: query,
                api_key: config.GIPHY_API_KEY,
                rating: message.channel.nsfw ? 'r' : 'pg'
            });
        if (!body.data.length) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${lang.commands.fun.gif[1]}`)
                    .setTimestamp()
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.RED)
            ]
        });
        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setImage(body.data[Math.floor(Math.random() * body.data.length)].images.original.url)
                    .setTimestamp()
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.PERSO)
            ]
        });

    }
};