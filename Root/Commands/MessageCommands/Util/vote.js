const colors = require('../../../Storage/json/colors.json');
const db = require('quick.db');

module.exports = {
    name: 'vote',
    description: 'vote',
    aliases: ["v"],
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setDescription(`Not Disponible\n\n[${lang.commandsa[0]}](https://nepust.fr/)`/*`${lang.commands.util.Ui["6"].replace('{VoteForMe}', "[vote for me](https://top.gg/bot/787400372938735616/vote)")}🥰🥳😊`*/)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
            .setTitle('VOTE')
            .setURL('https://top.gg/bot/787400372938735616/vote')
            ]
        })
    },
};