const weky = require("weky");
const db = require('quick.db')

module.exports = {
    name: 'calcul',
    aliasses: ["cal"],

    run: async (client, message, args, container) => { 
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

      await weky.Calculator({
        message: message,
        embed: {
          color: container.Colors.PERSO,
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