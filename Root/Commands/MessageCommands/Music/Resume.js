module.exports = {
  name: "resume",
  voiceChannel: true,

  run: async(client, message, args, container) => {
    const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`There is no music currently playing!. ❌`)
          ]
        });

        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.VERT)
            .setDescription(`**${queue.current.title}**, The song continues to play. ✅`)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
          ]
        });
  }
}