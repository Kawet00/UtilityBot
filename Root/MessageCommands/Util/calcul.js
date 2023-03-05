const weky = require("weky");
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'calcul',
    aliasses: ["cal"],

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        await weky.Calculator({
            message: message,
            embed: {
                color: colors.PERSO,
                title: "Calcul",
                footer: {
                    text: `©️ ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                },
                timestamp: true,
            },
            disabledQuery: `${lang.commands.util.calcul[0]}`,
            invalidQuery: `${lang.commands.util.calcul[1]}`,
            othersMessage: `${lang.commands.util.calcul[2].replace('{AUTHOR}', message.author)}`,
        });

    }

};