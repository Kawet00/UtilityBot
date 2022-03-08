const db = require('quick.db');

const colors = require('../../../Storage/json/colors.json');

module.exports = {
    name: '8ball',
    aliases: ["8b", "ball"],

    run: async (client, message, args, container) => {
        
        const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        let question = args.join(" ");
        if (!question)
            return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.fun.ball[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username} `, iconURL: client.user.avatarURL()})
                    .setTimestamp()
                ]
            })

        if (question.length < 10) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${container.Emotes.intelligent} ┇ ${lang.commands.fun.ball[9]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({ text: `© ${client.user.username} `, iconURL: client.user.avatarURL() })
                .setTimestamp()
            ]
        })

        if (question === "test")
            return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.fun.ball[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setColor(colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username} `, iconURL: client.user.avatarURL() })
                    .setTimestamp()
                ]
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
            new container.Discord.MessageEmbed()
            .setTitle("8BALL")
            .addFields({
                name: `${lang.commands.fun.ball[2]}  ${question}`,
                value: `${lang.commands.fun.ball[3]} ${reponse}`,
            })
            .setColor(colors.PERSO)
            .setDescription(`[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setFooter({ text: `© ${client.user.username} `, iconURL: client.user.avatarURL() })
            .setTimestamp()
        

        message.reply({
            embeds: [embed]
        }).then(() => {

        }).catch((e) => {
            console.log(e)
        })

    }
}