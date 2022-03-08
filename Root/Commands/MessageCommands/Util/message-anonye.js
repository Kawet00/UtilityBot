
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
  name: "anonymous-message",
  onlyUsers: ["509765051435974692", "691644619758370846"],
  aliases: ["msg-a", "a-msg", "message-anonyme"],
  cooldown: 10000,

  run: async (client, message, args, container) => {
    
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

    let msgUser = message.mentions.users.first();
    let messageBeingSent = args.join(" ").slice(22);

    if (!msgUser) return message.reply({
      embeds: [
      new container.Discord.MessageEmbed()
      .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
      .setColor(colors.EPINGLE)
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
      .setTimestamp()
           ]     
          });
  if (!messageBeingSent) return message.reply({
    embeds: [
      new container.Discord.MessageEmbed()
      .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
      .setColor(colors.EPINGLE)
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
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
          .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/R39FrwyZ7w)')}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
        ]
      });
      console.log(err)
    })
    .then(() => {
      message.member.send('test')
    })
  },
};
