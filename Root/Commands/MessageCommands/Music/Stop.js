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
          .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
        ]
      });

      queue.destroy();

      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.VERT)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          .setDescription(`${container.Emotes.pepe.pepe_ok} ┇ ${lang.commands.music.stop[0]}`)
        ]
      });
  },
};