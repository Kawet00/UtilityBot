const db = require('quick.db');

module.exports = {
  name: "skip",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
    const queue = client.player.getQueue(message.guild.id);
 
if (!queue || !queue.playing) return message.reply({
  embeds: [
    new container.Discord.MessageEmbed()
    .setColor(container.Colors.RED)
    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    .setDescription(`  ${lang.commands.music.AnyM[0]}`)
  ]
});

const success = queue.skip();

return message.reply({
  embeds: [
    new container.Discord.MessageEmbed()
    .setColor(success ? container.Colors.VERT : container.Colors.RED)
    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    .setDescription(success ? `**${queue.current.title}**, ${lang.commands.music.Skip[0]}` : `${lang.commands.music.SomethW[0]}`)
  ]
});
  }
}