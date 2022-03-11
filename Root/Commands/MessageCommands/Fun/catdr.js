
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {

    name: 'fun-cat',
    description: 'none',
    aliases: ["f-c"],
    cooldown: 5000,


    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        const catdr = [
            "https://media.giphy.com/media/WXB88TeARFVvi/giphy.gif",
            "https://media.giphy.com/media/33OrjzUFwkwEg/giphy.gif",
            "https://media.giphy.com/media/8vQSQ3cNXuDGo/giphy.gif",
            "https://media.giphy.com/media/zP7rxBSqO4jRu/giphy.gif",
            "https://media.giphy.com/media/23eIaihzejUmUtIDkO/giphy.gif",
            "https://media.giphy.com/media/WnOBP6JeOBdhS/giphy.gif",
            "https://media.giphy.com/media/6byDVsPwzrz9K/giphy.gif",
            "https://media.giphy.com/media/JKb28stpt0gwg/giphy.gif",
            "https://media.giphy.com/media/tBxyh2hbwMiqc/giphy.gif",
            "https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif",
            "https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif",
            "https://media.giphy.com/media/MCfhrrNN1goH6/giphy.gif",
            "https://media.giphy.com/media/H4DjXQXamtTiIuCcRU/giphy.gif"
        ]
        const catd = catdr[Math.floor(Math.random() * catdr.length)];

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(catd)
            .setDescription(`${container.Emotes.cat} ${lang.commands.fun.animaux[3]}  ${container.Emotes.cat}`)
            .setImage(catd)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
    }
};