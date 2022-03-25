const weky = require("weky");
const db = require('quick.db')

module.exports = {
    name: 'snake',
    aliases: ["snk"],

    run: async (client, message, args, container) => { 
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

      await weky.Snake({
        message: message,
        embed: {
          color: container.Colors.PERSO,
          title: "Snake",
          description: `${container.Emotes.autre.cool_pika} ┇ ${lang.commands.fun.snake[0].replace('{PLAYER}', message.author).replace('{SCORE}', '{{score}}')}`,
          footer: {
            text: `©️ ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
        },
          timestamp: true,
        },
        emojis: {
          empty: "⬛",
          snakeBody: "🟦",
          food: "🔴",
          up: "⬆️",
          right: "⬅️",
          down: "⬇️",
          left: "➡️",
        },
        othersMessage: `${container.Emotes.blob.blob_n} ┇ ${lang.commands.fun.snake[1].replace('{PLAYER}', message.author)}`,
        buttonText: "Stop",
      });

    }

};