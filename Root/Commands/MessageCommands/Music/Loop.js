const { QueueRepeatMode } = require('discord-player')

module.exports = {
  name: "loop",
  description: "loop",
  aliases: ["lp"],
  voiceChannel: true,

  run: async(client, message, args, container) => {
    const queue = client.player.getQueue(message.guild.id);

 
    if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);
    
            if (args.join('').toLowerCase() === 'queue') {
                if (queue.repeatMode === 1) return message.channel.send(`${message.author}, You should disable loop mode of existing music first **(${container.Config.px}loop)** ❌`);
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);
    
                return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, The whole sequence will repeat non-stop 🔁` : `${message.author}, Something went wrong. ❌`);
            } else {
                if (queue.repeatMode === 2) return message.channel.send(`${message.author}, In Loop mode you must disable existing queue first **(${container.Config.px}loop queue)** ❌`);
    
                const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
    
                return message.channel.send(success ? `Loop Mode: **${queue.repeatMode === 0 ? 'Inactive' : 'Active'}**, Current music will be repeated non-stop (all music in the list **${container.Prefix}loop queue**  You can repeat it with the option.) 🔂` : `${message.author}, Something went wrong ❌`);
    };
  }
};