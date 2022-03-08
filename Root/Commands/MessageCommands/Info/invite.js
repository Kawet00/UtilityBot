const colors = require('../../../Storage/json/colors.json')

const db = require('quick.db')

module.exports = {
    name: 'invite',
    description: 'none',
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.invite[0].replace('{UtilityBot}', '[invite Utility Bot](https://www.utilitybot.ga/)')}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
              .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
              .setTitle(lang.commands.util.invite[1])
              .setURL('https://www.utilitybot.ga/')
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            ]
        })
    }
}