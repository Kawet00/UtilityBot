const colors = require('../../../Storage/json/colors.json')

const db = require('quick.db')

module.exports = {
    name: 'invite',
    description: 'none',
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.invite[0].replace('{UtilityBot}', '[invite Utility Bot](https://utilitybot.me/)')}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
              .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
              .setTitle(lang.commands.util.invite[1])
              .setURL('https://utilitybot.me/')
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
            ]
        })
        setTimeout(() =>{
            message.delete();
          }, 300)
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Invite')
                    .addField('Erreur', `\`\`\`${e}\`\`\``)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setColor(colors.PERSO)
                ]
            })
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${lang.commands.problem[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            })
            console.log(e)
        }
    }
}