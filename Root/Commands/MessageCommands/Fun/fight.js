const weky = require("weky");
const db = require('quick.db')

module.exports = {
    name: 'fight',

    run: async (client, message, args, container) => { 
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

      if(!message.mentions.users.first()) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.fun.rps[16]}`)
          .setColor(container.Colors.EPINGLE)
          .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      await weky.Fight({
        message: message,
        opponent: message.mentions.users.first(),
        embed: {
            title: 'Fight',
            color: container.Colors.PERSO,
            footer: {
              text: `©️ ${client.user.username}`,
              iconURL: client.user.displayAvatarURL()
            },
            timestamp: true
        },
        buttons: {
          hit: lang.commands.fun.fight[1],
          heal: lang.commands.fun.fight[2],
          cancel: lang.commands.fun.fight[3],
          accept: lang.commands.fun.fight[4],
          deny: lang.commands.fun.fight[5]
        },
        acceptMessage: lang.commands.fun.fight[6].replace('{PLAYER1}', '{{challenger}}').replace('{PLAYER2}', '{{opponent}}'),
        winMessage: lang.commands.fun.fight[7].replace('{WINNER}', '{{winner}}'),
        endMessage: lang.commands.fun.fight[8].replace('{PLAYER2}', "{{opponent}}"),
        cancelMessage: lang.commands.fun.fight[9].replace('{PLAYER2}', '{{opponent}}'),
        fightMessage: lang.commands.fun.fight[10].replace('{PLAYER}', '{{player}}'),
        opponentsTurnMessage: lang.commands.fun.fight[11],
        highHealthMessage: lang.commands.fun.fight[12],
        lowHealthMessage: lang.commands.fun.fight[13],
        returnWinner: false,
        othersMessage: lang.commands.fun.fight[14].replace("{AUTHOR}", "{{author}}")
    });

    }

};