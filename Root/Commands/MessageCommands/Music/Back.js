const db = require('quick.db');

module.exports = {
  name: "back",
  description: "back",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {
    
    const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
          .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
          .setThumbnail()
          ]
        });

        if (!queue.previousTracks[1]) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
          .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Back[0]}`)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
          .setThumbnail()
          ]
      });

        await queue.back();

        message.channel.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.VERT)
          .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.music.Back[1]}`)
        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
        .setThumbnail()
      ]
      });
    } catch (e) {
      client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
          embeds: [
              new container.Discord.MessageEmbed()
              .setDescription('Petit problème avec un utilisateur.')
              .addField('Nom de la commande', 'Pause')
              .addField('Erreur', `\`\`\`${e}\`\`\``)
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
              .setTimestamp()
              .setColor(container.Colors.PERSO)
          ]
      })
      message.reply({
          embeds: [
              new container.Discord.MessageEmbed()
              .setDescription(`${lang.commands.problem[0]}`)
              .setColor(container.Colors.EPINGLE)
              .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
              .setTimestamp()
          ]
      })
      console.log(e)
    }
  }
};