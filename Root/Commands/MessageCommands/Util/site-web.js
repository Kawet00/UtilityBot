const colors = require('../../../Storage/json/colors.json');
const db = require('quick.db');

module.exports = {
    name: 'site-web',
    description: 'flm',
    aliases: ["s-w", "website", "w-s"],
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
            .setTitle(lang.commands.util.Sw[0])
            .setDescription(`${lang.commands.util.Sw[1].replace('{WebSite}', "[Web Site](https://www.utilitybot.ga/)")}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setURL('https://www.utilitybot.ga//')
            ]
        })
    }
}