const weky = require("weky");
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'snake',
    aliases: ["snk"],

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        await weky.Snake({
            message: message,
            embed: {
                color: colors.PERSO,
                title: "Snake",
                description: `${emotes.autre.cool_pika} ┇ ${lang.commands.fun.snake[0].replace('{PLAYER}', message.author).replace('{SCORE}', '{{score}}')}`,
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
            othersMessage: `${emotes.blob.blob_n} ┇ ${lang.commands.fun.snake[1].replace('{PLAYER}', message.author)}`,
            buttonText: "Stop",
        });

    }

};