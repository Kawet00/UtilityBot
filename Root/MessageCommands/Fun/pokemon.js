const { GuessThePokemon } = require('discord-gamecord');
const colors = require('../../Storage/json/colors.json');
const {getLang} = require('../../Storage/db/manager');

module.exports = {
    name: "pokemon",

    run: async (client, message) => {
        const lang = await getLang(message.guild.id);
        const Game = new GuessThePokemon({
            message: message,
            isSlashGame: false,
            embed: {
                title: lang.commands.fun.pokemon[0],
                color: colors.PERSO,
            },
            timeoutTime: 60000,
            winMessage: lang.commands.fun.pokemon[1],
            loseMessage: lang.commands.fun.pokemon[2],
            errMessage: lang.commands.fun.pokemon[3],
            playerOnlyMessage: lang.commands.fun.pokemon[4]
        });

        Game.startGame();
    }
}