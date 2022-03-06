const db = require('quick.db');

module.exports = {
  name: 'pause',
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
    const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.reply({
         embeds: [
           new container.Discord.MessageEmbed()
           .setDescription(`  ${lang.commands.music.AnyM[0]}`)
           .setColor(container.Colors.RED)
           .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
           .setTimestamp()
         ]
        });

        const success = queue.setPaused(true);

        return message.reply({
          embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(success ? lang.commands.music.Pause[0].replace('{TITLE}', queue.current.title) : `Something went wrong. ❌`)
          .setColor(sucess ? container.Colors.VERT : CredentialsContainer.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          ]
        });
  }
}