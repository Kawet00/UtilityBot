const weky = require("weky");
const db = require('quick.db')

module.exports = {
    name: 'quick-click',
    aliases: ["quick-clique", "qc", "q-c"],
    cooldown: 10000,

    run: async (client, message, args, container) => { 
      if(db.get(`quickClick`) === false) return;
      
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

      await weky.QuickClick({
        message: message,
        embed: {
          title: 'Quick Click',
          color: container.Colors.PERSO,
          footer: {
            text: `©️ ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
            },
          timestamp: true
        },
        time: 60000,
        waitMessage: `${lang.commands.fun.QuickC[0]}`,
        startMessage: `${lang.commands.fun.QuickC[1].replace('{TIME}', '{{time}}')}`,
        winMessage: `${lang.commands.fun.QuickC[2].replace('{WINNER}', '{{winner}}').replace('{TIME}', "{{time}}")}`,
        loseMessage: `${lang.commands.fun.QuickC[3]}`,
        emoji: container.Emotes.autre.UT_LOGO,
        ongoingMessage:`${lang.commands.fun.QuickC[4].replace('{CHANNEL}', '{{channel}}')}`
      });

    }

};