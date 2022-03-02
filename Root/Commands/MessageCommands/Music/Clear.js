module.exports = {
  name: 'clear-list',
  voiceChannel: true,

  run: async(client, message, args, container) => {
      const queue = client.player.getQueue(message.guild.id);

      if (!queue || !queue.playing) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.RED)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`No music currently playing. ❌`)
        ]
      });

      if (!queue.tracks[0]) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.EPINGLE)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`There is already no music in queue after the current one ❌`)
        ]
      });

      await queue.clear();

      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.VERT)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
        .setDescription(`The queue has just been cleared. 🗑️`)
        ]
      });
  },
};