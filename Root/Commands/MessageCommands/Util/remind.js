const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
  name: "remind",
  description: "remind",
  aliases: ["rm"],

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {

    let duration = args[0].slice(0, -1);
        if (!duration) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }

        if(isNaN(duration)) {
          return message.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[1]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
              .setColor(colors.EPINGLE)
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
              .setTimestamp()
            ]
          })
        }

    var filteredMessage = args.slice(1).join(" ") || lang.commands.util.Rm[9];
    function reminder() {
      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[2]}`)
          .addField(lang.commands.util.Rm[3], `${filteredMessage}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
          .setColor(colors.EPINGLE)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
        ]
      });
    }
      if(args[0].slice(2) === 's' || args[0].slice(1) === 's') {
        var msDelay = args[0].slice(0, -1) * 1000;
        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} ${lang.commands.util.Rm[5]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
            .setColor(colors.VERT)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
          ]
          }).then(() => {
        setTimeout(reminder, msDelay)
        })
      }

      if(args[0].slice(2) === 'm' || args[0].slice(1) === 'm') {
        var msDelay = args[0].slice(0, -1) * 60000;
        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} minutes.\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
            .setColor(colors.VERT)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
          ]
          }).then(() => {
          setTimeout(reminder, msDelay)
          })
      }

        if(args[0].slice(2) === 'h' || args[0].slice(1) === 'h') {
        var msDelay = args[0].slice(0, -1) * 3600000;
        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} ${lang.commands.util.Rm[6]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
            .setColor(colors.VERT)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
          ]
          }).then(() => {
          setTimeout(reminder, msDelay)
          })
      }
      
      if(args[0].slice(2) === 'd' || args[0].slice(1) === 'd') {
        var msDelay = args[0].slice(0, -1) * 86400000;
        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)}${lang.commands.util.Rm[7]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
            .setColor(colors.VERT)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
          ]
          }).then(() => {
          setTimeout(reminder, msDelay)
          })
    }

    if (args[0].slice(2) === 'd' || args[0].slice(1) === 'd' || args[0].slice(2) === 'h' || args[0].slice(1) === 'h' || args[0].slice(2) === 'm' || args[0].slice(1) === 'm' || args[0].slice(2) === 's' || args[0].slice(1) === 's') {
      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[8]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
          .setColor(colors.EPINGLE)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
        ]
        })
    }
  } catch (e) {
      client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
          embeds: [
              new container.Discord.MessageEmbed()
              .setDescription('Petit problème avec un utilisateur.')
              .addField('Nom de la commande', 'Remind')
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
