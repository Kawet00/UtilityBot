module.exports = {
  name: "back",
  description: "back",
  voiceChannel: true,

  run: async(client, message, args, container) => {
    const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
          .setDescription(`No music currently playing!`)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
          .setThumbnail()
          ]
        });

        if (!queue.previousTracks[1]) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
          .setDescription(`There was no music playing before.`)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
          .setThumbnail()
          ]
      });

        await queue.back();

        message.channel.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.VERT)
          .setDescription(`Previous music started playing... ✅`)
        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
        .setThumbnail()
      ]
      });
  }
};