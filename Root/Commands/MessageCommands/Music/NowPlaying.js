module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    voiceChannel: true,

    run: async(client, message, args, container) => {
      Object.assign(this, container)
        const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

        const track = queue.current;

        const embed = new container.Discord.MessageEmbed();

        const progress = queue.createProgressBar();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

        embed.setDescription(`Audio **%${queue.volume}**\nDuration **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${track. requestedBy}`);

        embed.addField('\u200B', '\u200B')
        embed.addField(`Track, (${timestamp.progress}%)`, progress)
        embed.setTimestamp();
        embed.setFooter({ text: 'Edited by Umut Bayraktar ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        const row = new container.Discord.MessageActionRow().addComponents(
          new container.Discord.MessageButton()
        .setLabel('Save Song')
        .setCustomId('saveBtn')
        .setStyle('SUCCESS')
        )

        message.channel.send({ embeds: [embed], components: [row] });
    },
};