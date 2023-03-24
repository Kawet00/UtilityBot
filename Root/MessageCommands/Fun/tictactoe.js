const { TicTacToe } = require('discord-gamecord');
const { getLang } = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: "tictactoe",
    cooldown: 60000,
    aliases: ["morpion"],

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        if (!message.mentions.users.first()) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.tictac[6]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
        const Game = new TicTacToe({
            message: message,
            isSlashGame: false,
            opponent: message.mentions.users.first(),
            embed: {
                title: lang.commands.fun.tictac[0],
                color: colors.PERSO,
                statusTitle: 'Status',
                overTitle: 'Game Over'
            },
            emojis: {
                xButton: '❌',
                oButton: '🔵',
                blankButton: '➖'
            },
            mentionUser: true,
            timeoutTime: 60000,
            xButtonStyle: 'DANGER',
            oButtonStyle: 'PRIMARY',
            turnMessage: lang.commands.fun.tictac[1],
            winMessage: lang.commands.fun.tictac[2],
            tieMessage: lang.commands.fun.tictac[3],
            timeoutMessage: lang.commands.fun.tictac[4],
            playerOnlyMessage: lang.commands.fun.tictac[5]
        });

        Game.startGame();
    }
}