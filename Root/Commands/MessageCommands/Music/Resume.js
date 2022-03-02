module.exports = {
  name: "resume",
  voiceChannel: true,

  run: async(client, message, args, container) => {
    const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

        return message.channel.send(`**${queue.current.title}**, The song continues to play. ✅`);
  }
}