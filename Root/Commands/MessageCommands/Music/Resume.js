const db = require('quick.db');

module.exports = {
  name: "resume",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
    const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.AnyM[0]}`)
          ]
        });

        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.VERT)
            .setDescription(`**${queue.current.title}**,   ${lang.commands.music.Resume[0]}`)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
          ]
        });
  }
}