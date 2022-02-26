const colors = require('../../../Storage/json/colors.json');
const db = require('quick.db');

module.exports = {
    name: 'site-web',
    description: 'flm',
    onlyUsers: ["509765051435974692", "691644619758370846"],
    aliases: ["s-w", "website", "w-s"],
    cooldown: 20000,

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.PERSO)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            .setTitle(lang.commands.util.Sw[0])
            .setDescription(`${lang.commands.util.Sw[1].replace('{WebSite}', "[Web Site](https://www.utilitybot.ga/)")}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setURL('https://www.utilitybot.ga//')
            ]
        })
    }
}