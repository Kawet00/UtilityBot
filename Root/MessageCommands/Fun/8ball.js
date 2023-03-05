const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    aliases: ["8b", "ball"],
    name: '8ball',

    run: async (client, message, args) => {
        const lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let question = args.join(" ");
        if (!question)
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.fun.ball[0]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ],
                ephemeral: true
            })

        if (question.length < 10) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(`${emotes.autre.intelligent} ┇ ${lang.commands.fun.ball[9]}`)
                    .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ],
            ephemeral: true
        })

        if (question === "test")
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.fun.ball[1]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ],
                ephemeral: true
            })

        let reponses = [
            lang.commands.fun.ball[4],
            lang.commands.fun.ball[5],
            lang.commands.fun.ball[6],
            lang.commands.fun.ball[7],
            lang.commands.fun.ball[8]
        ];
        let reponse = reponses[Math.floor(Math.random() * reponses.length)];
        let embed =
            new EmbedBuilder()
                .setTitle("8BALL")
                .addFields({
                    name: `${lang.commands.fun.ball[2]}  ${question}`,
                    value: `${lang.commands.fun.ball[3]} ${reponse}`,
                })
                .setColor(colors.PERSO)
                .setFooter({text: `© ${client.user.username} `, iconURL: client.user.displayAvatarURL()})
                .setTimestamp()


        message.reply({
            embeds: [embed]
        })
    }
}