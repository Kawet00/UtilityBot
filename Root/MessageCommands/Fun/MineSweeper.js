const { Minesweeper } = require('discord-gamecord');
const { getLang } = require('../../Storage/db/manager');

module.exports = {
    name: "minesweeper",
    cooldown: 20000,
    aliases: ["démineur"],

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        const Game = new Minesweeper({
            message: message,
            isSlashGame: false,
            embed: {
                title: lang.commands.fun.mines[0],
                color: '#5865F2',
                description: lang.commands.fun.mines[1]
            },
            emojis: { flag: '🚩', mine: '💣' },
            mines: 5,
            timeoutTime: 60000,
            winMessage: lang.commands.fun.mines[2],
            loseMessage: lang.commands.fun.mines[3],
            playerOnlyMessage: lang.commands.fun.mines[4]
        });
        Game.startGame();
    }
}