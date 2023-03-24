const { MatchPairs } = require('discord-gamecord');
const colors = require('../../Storage/json/colors.json');
const {getLang} = require('../../Storage/db/manager');

module.exports = {
    name: "matchpairs",

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        const Game = new MatchPairs({
            message: message,
            isSlashGame: false,
            embed: {
                title: lang.commands.fun.matchpairs[0],
                color: colors.PERSO,
                description: lang.commands.fun.matchpairs[1]
            },
            timeoutTime: 60000,
            emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
            winMessage: lang.commands.fun.matchpairs[2],
            loseMessage: lang.commands.fun.matchpairs[3],
            playerOnlyMessage: lang.commands.fun.matchpairs[4]
        });

        Game.startGame();
    }
}