const { Connect4 } = require('discord-gamecord');
const { getLang } = require('../../Storage/db/manager');

module.exports = {
    name: "connect4",
    cooldown: 60000,

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        if (!message.mentions.users.first()) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.connect4[6]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
        const Game = new Connect4({
            message: message,
            isSlashGame: false,
            opponent: message.mentions.users.first(),
            embed: {
                title: lang.commands.fun.connect4[0],
                statusTitle: 'Status',
                color: '#5865F2'
            },
            emojis: {
                board: '⚪',
                player1: '🔴',
                player2: '🟡'
            },
            mentionUser: true,
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            turnMessage: lang.commands.fun.connect4[1],
            winMessage: lang.commands.fun.connect4[2],
            tieMessage: lang.commands.fun.connect4[3],
            timeoutMessage: lang.commands.fun.connect4[4],
            playerOnlyMessage: lang.commands.fun.connect4[5]
        });

        Game.startGame();
    }
}