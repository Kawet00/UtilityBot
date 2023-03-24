const { TwoZeroFourEight } = require('discord-gamecord');
const { getLang } = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: "2048",
    cooldown: 60000,

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        const Game = new TwoZeroFourEight({
            message: message,
            isSlashGame: false,
            embed: {
                title: '2048',
                color: colors.PERSO
            },
            emojis: {
                up: '⬆️',
                down: '⬇️',
                left: '⬅️',
                right: '➡️',
            },
            timeoutTime: 60000,
            buttonStyle: 'PRIMARY',
            playerOnlyMessage: lang.commands.fun.TwoZeroFourEight[0]
        });
        Game.startGame();
    }
}