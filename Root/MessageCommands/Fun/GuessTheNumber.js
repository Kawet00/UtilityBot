const weky = require("weky");
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'GuessTheNumber',
    aliases: ['GTN'],
    cooldown: 10000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        await weky.GuessTheNumber({
            message: message,
            embed: {
                title: lang.commands.fun.GTN[0],
                description: lang.commands.fun.GTN[1].replace('{TIME}', '{{time}}'),
                color: colors.PERSO,
                footer: {
                    text: `©️ ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                },
                timestamp: true
            },
            publicGame: true,
            time: 60000,
            winMessage: {
                publicGame: lang.commands.fun.GTN[2].replace('{NUMBER}', '{{number}}').replace('{WINNER}', '{{winner}}').replace('{TIME}', '{{time}}').replace('{TIME}', '{{time}}').replace('{NUMBEROFP}', '{{totalparticipants}}').replace('{PART}', '{{participants}}'),
                privateGame: lang.commands.fun.GTN[3].replace('{NUMBER}', '{{number}}').replace('{TIME}', '{{time}}'),
            },
            loseMessage: lang.commands.fun.GTN[4].replace('{NUMBER}', '{{number}}'),
            bigNumberMessage: lang.commands.fun.GTN[5].replace('{AUTHOR}', '{{author}}').replace('{NUMBER}', '{{number}}'),
            smallNumberMessage: lang.commands.fun.GTN[6].replace('{AUTHOR}', '{{author}}').replace('{NUMBER}', '{{number}}'),
            othersMessage: lang.commands.fun.GTN[7].replace('{AUTHOR}', '{{author}}'),
            buttonText: lang.commands.fun.GTN[8],
            ongoingMessage: lang.commands.fun.GTN[9].replace('{CHANNEL}', "{{channel}}"),
            returnWinner: false
        });

    }

};