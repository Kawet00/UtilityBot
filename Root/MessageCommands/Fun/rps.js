const { RockPaperScissors } = require('discord-gamecord');
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
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.rps[10]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

                const Game = new RockPaperScissors({
                    message: message,
                    isSlashGame: false,
                    opponent: message.mentions.users.first(),
                    embed: {
                        title: lang.commands.fun.rps[0],
                        color: colors.PERSO,
                        description: lang.commands.fun.rps[1]
                    },
                    buttons: {
                        rock: lang.commands.fun.rps[2],
                        paper: lang.commands.fun.rps[3],
                        scissors: lang.commands.fun.rps[4]
                    },
                    emojis: {
                        rock: '🌑',
                        paper: '📰',
                        scissors: '✂️'
                    },
                    mentionUser: true,
                    timeoutTime: 60000,
                    buttonStyle: 'PRIMARY',
                    pickMessage: lang.commands.fun.rps[5],
                    winMessage: lang.commands.fun.rps[6],
                    tieMessage: lang.commands.fun.rps[7],
                    timeoutMessage: lang.commands.fun.rps[8],
                    playerOnlyMessage: lang.commands.fun.rps[9]
                });
                Game.startGame();

    }

};