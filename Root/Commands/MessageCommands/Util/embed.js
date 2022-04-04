const db = require('quick.db')

module.exports = {
    name: 'embed',

    run: async (client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {
      const id = args[0]
      if(!id) return message.reply({
        embeds: [
          new container,Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .setDescription('Vous devez préciser un identifiant de embed.')
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      if(id.length > 3) return message.reply({
        embeds: [
          new container,Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .setDescription('Un indantifiant doit avoir obligatoirement 3 charactères')
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      if(id.length < 3) return message.reply({
        embeds: [
          new container,Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .setDescription('Un indantifiant doit avoir obligatoirement 3 charactères')
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      const dbUser = db.get(`embed.${message.member.id}.${id}`)
      if(!dbUser) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .setDescription(`Cette idantifiant est invalide. 

          1. Assurez vous que l'identifiant existe bien.
          2. Assurez vous qu'il vous appartient bien.
          3. Assurez vous que l'identifiant est bien écrit.`)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      message.channel.send({
        embeds: [
          dbUser.embed
        ]
      })
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Embed')
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

};