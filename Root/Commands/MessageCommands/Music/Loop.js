const { QueueRepeatMode } = require('discord-player')

module.exports = {
  name: "loop",
  description: "loop",
  aliases: ["lp"],
  voiceChannel: true,

  run: async(client, message, args, container) => {
    const queue = client.player.getQueue(message.guild.id);

 
    if (!queue || !queue.playing) return message.reply({
      embeds: [
        
        new container.Discord.MessageEmbed()
        .setDescription(`There is no music currently playing!. ❌`)]});
    
            if (args.join('').toLowerCase() === 'queue') {
                if (queue.repeatMode === 1) return message.reply({
                  embeds: [
                    
                    new container.Discord.MessageEmbed()
                    .setDescription(`You should disable loop mode of existing music first **(${container.Prefix}loop)** ❌`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setColor(container.Colors.RED)
                  ]
                })
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
    
                return message.reply({
                  embeds: [
                    
                    new container.Discord.MessageEmbed()
                    .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, The whole sequence will repeat non-stop 🔁` : `Something went wrong. ❌`)
                    .setColor(success ? container.Colors.GREEN : container.Colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                  ]
                });
            } else {
                if (queue.repeatMode === 2) return message.reply({
                  embeds: [
                    
                    new container.Discord.MessageEmbed()
                    .setDescription(`In Loop mode you must disable existing queue first **(${container.Prefix}loop queue)**`)
                    .setColor(container.Colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                  ]
                });
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
    
                return message.reply({
                  embeds: [
                    
                    new container.Discord.MessageEmbed()
                    .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Current music will be repeated non-stop (all music in the list **${container.Prefix}loop queue**  You can repeat it with the option.) 🔂` : `Something went wrong ❌`)]});
    };
  }
};