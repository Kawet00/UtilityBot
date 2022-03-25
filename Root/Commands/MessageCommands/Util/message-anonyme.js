
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
  name: "anonymous-message",
  aliases: ["msg-a", "a-msg", "message-anonyme"],
  cooldown: 10000,

  run: async (client, message, args, container) => {
    
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    try {

    let msgUser = message.mentions.users.first();
    let messageBeingSent = args.join(" ").slice(22);

    if (!msgUser) return message.reply({
      embeds: [
      new container.Discord.MessageEmbed()
      .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
      .setColor(colors.EPINGLE)
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
      .setTimestamp()
           ]     
          });
  if (!messageBeingSent) return message.reply({
    embeds: [
      new container.Discord.MessageEmbed()
      .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
      .setColor(colors.EPINGLE)
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
      .setTimestamp()  
    ]
    })
 
    msgUser.send({
      embeds: [
        new container.Discord.MessageEmbed()
      .setTimestamp()
      .setColor(colors.PERSO)
      .setThumbnail("https://comparatif-vpn.fr/wp-content/uploads/2018/04/Navigation-prive%CC%81e-anonyme-1280x720.jpg")
      .setFooter(
        `© ${client.user.username}`,
        message.client.user.displayAvatarURL({ dynamic: true })
      )
      .setTitle(`${container.Emotes.blob.blob_w} ┇ ${lang.commands.util.messageA[0]}`)
      .setDescription(`${messageBeingSent}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
      ]
    })
    .catch((err) => {
      message.reply({
        embeds: [
        new container.Discord.MessageEmbed()
          .setColor(colors.RED)
          .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/R39FrwyZ7w)')}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
        ]
      });
      console.log(err)
    })
    .then(() => {
      message.member.send('test')
    })
  } catch (e) {
      client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
          embeds: [
              new container.Discord.MessageEmbed()
              .setDescription('Petit problème avec un utilisateur.')
              .addField('Nom de la commande', 'Messages Anonyme')
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
