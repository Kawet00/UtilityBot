const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
    name: 'github',
    aliases: ["git"],
    description: 'none',
    cooldown: 10000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.github[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
              .setThumbnail(client.user.avatarURL({ dynamic: true, size: 512 }))
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
                    .addField('Nom de la commande', 'Github')
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