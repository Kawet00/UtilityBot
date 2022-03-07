const db = require('quick.db');

module.exports = {
  name: 'clear-list',
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
      const queue = client.player.getQueue(message.guild.id);

      if (!queue || !queue.playing) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.RED)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
        ]
      });

      if (!queue.tracks[0]) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.EPINGLE)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Clear[0]}`)
        ]
      });

      await queue.clear();

      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.VERT)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.music.Clear[1]}`)
        ]
      });
  },
};