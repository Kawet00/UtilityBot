
const db = require('quick.db')

module.exports = {
  name: 'color',
  cooldown: 5000,

  run: async (client, message, args, container) => {
    
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

    try {
      const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6);

      message.channel.send({
        embeds: [
          new container.Discord.MessageEmbed()
        .setColor(hex)
        .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.color[0].replace('{HEX}', hex)}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
        .setTitle("#" + hex)
         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
        .setTimestamp()
        ]
      });
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Color')
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