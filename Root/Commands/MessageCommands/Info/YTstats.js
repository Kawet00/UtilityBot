const yts = require("yt-search");
const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'ytstats',
    aliases: ["yts"],
    cooldown: 10000,

    run: async (client, message, args, container) => { 
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

      try {

        const channelName = args.join(" ");

  if (!channelName) {
    message.reply({
      embeds: [
        new container.Discord.MessageEmbed()
      .setColor(colors.EPINGLE)
      .setDescription(`${lang.commands.util.YTS[0]}`)
      .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()
      ],
    });
  } else {
    const result = await yts(channelName);
    const channels = result.channels.slice(0, 1);
    channels.forEach(function (c) {
      const ytstatsEmbed = new container.Discord.MessageEmbed()
        .setColor(colors.RED)
        .setThumbnail(c.image)
        .setTitle("YouTube Stats")
        .addField(lang.commands.util.YTS[1], `${c.name}`, false)
        .addField(lang.commands.util.YTS[2], `${c.subCount.toLocaleString()}`, false)
        .addField(lang.commands.util.YTS[3], `${c.videoCount.toLocaleString()}`, false)
        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTimestamp()

      const row = new container.Discord.MessageActionRow().addComponents(
        new container.Discord.MessageButton()
          .setLabel(lang.commands.util.YTS[4])
          .setStyle("LINK")
          .setURL(c.url)
      );

      message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
              .setColor(colors.PERSO)
              .setDescription(lang.commands.util.YTS[5])
              .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
          ],
        }).then(async (s) => {
          s.edit({
            embeds: [ytstatsEmbed],
            components: [row],
          });
        });
    });
}
} catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Youtube Stats')
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