const superagent = require('superagent');
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'slap',
    cooldown: 10000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        if (!message.mentions.users.first()) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.slap[0]} `)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (message.mentions.users.first().id === client.user.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.fun.slap[1]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (message.mentions.users.first().id == message.author.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.fun.slap[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        const {body} = await superagent
            .get("https://nekos.life/api/v2/img/slap");

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(lang.commands.fun.slap[3]
                        .replace('{USERM}', message.mentions.users.first().username)
                        .replace('{USER}', message.author.username)
                        .replace('{EMOJI}', emotes.pepe.pepe_wa)
                    )
                    .setImage(body.url)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
    }
}