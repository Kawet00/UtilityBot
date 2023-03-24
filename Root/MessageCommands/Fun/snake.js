const { Snake } = require('discord-gamecord');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "snake",
    description: "play snake",
    aliases: ["snk"],

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        const Game = new Snake({
            message: message,
            isSlashGame: false,
            embed: {
                title: 'Snake',
                overTitle: 'Game Over',
                color: colors.PERSO
            },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            snake: {head: '🟢', body: '🟩', tail: '🟢', skull: '💀'},
            foods: ['🍎', '🍇', '🍊', '🫐', '🥕', '🥝', '🌽'],
            stopButton: 'Stop',
            timeoutTime: 60000,
            playerOnlyMessage: lang.commands.fun.snake[0]
        });

        Game.startGame();
    }
}