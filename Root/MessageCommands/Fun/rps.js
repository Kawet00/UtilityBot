const weky = require("weky");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'rps',
    aliases: ["ppc"],
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        if (!message.mentions.users.first()) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.rps[16]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        await weky.RockPaperScissors({
            message: message,
            opponent: message.mentions.users.first(),
            embed: {
                title: `${emotes.autre.intelligent} ┇ ${lang.commands.fun.rps[0]}`,
                description: lang.commands.fun.rps[1],
                color: colors.PERSO,
                footer: {
                    text: `©️ ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                },
                timestamp: true
            },
            buttons: {
                rock: lang.commands.fun.rps[2],
                paper: lang.commands.fun.rps[3],
                scissors: lang.commands.fun.rps[4],
                accept: lang.commands.fun.rps[5],
                deny: lang.commands.fun.rps[6],
            },
            time: 60000,
            acceptMessage: lang.commands.fun.rps[7].replace('{PLAYER}', "{{challenger}}").replace('{PLAYER2}', "{{opponent}}"),
            winMessage: lang.commands.fun.rps[8].replace('{WINNER}', "{{winner}}"),
            drawMessage: lang.commands.fun.rps[9],
            endMessage: lang.commands.fun.rps[10].replace('{PLAYER2}', "{{opponent}}"),
            timeEndMessage: lang.commands.fun.rps[11],
            cancelMessage: lang.commands.fun.rps[12].replace('{PLAYER2}', "{{opponent}}"),
            choseMessage: lang.commands.fun.rps[13].replace('{EMOJI}', '{{emoji}}'),
            noChangeMessage: lang.commands.fun.rps[14],
            othersMessage: lang.commands.fun.rps[15].replace('{AUTHOR}', "{{author}}"),
            returnWinner: false
        });

    }

};