const colors = require('../../../Storage/json/colors.json')
const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db')

module.exports = {
    name: 'invite',
    description: 'none',
    cooldown: 20000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        message.reply({
            embeds: [
            new Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.util.invite[0].replace('{UtilityBot}', '[invite Utility Bot](https://www.utilitybot.ga/)')}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
              .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
              .setTitle(lang.commands.util.invite[1])
              .setURL('https://www.utilitybot.ga/')
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            ]
        })
    }
}