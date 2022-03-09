const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
    name: 'github',
    description: 'none',
    cooldown: 10000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.github[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
              .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            ]
        })
    }
}