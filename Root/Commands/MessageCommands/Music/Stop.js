const db = require('quick.db');

module.exports = {
  name: "stop",
  description: "stop",
  aliases: ["st"],
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
      const queue = client.player.getQueue(message.guild.id);

      if (!queue || !queue.playing) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          .setDescription(`${message.author}, There is no music currently playing!. ❌`)
        ]
      });

      queue.destroy();

      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.VERT)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          .setDescription(`The music playing on this server has been turned off, see you next time ✅`)
        ]
      });
  },
};