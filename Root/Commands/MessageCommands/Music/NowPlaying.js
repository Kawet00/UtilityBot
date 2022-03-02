module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    voiceChannel: true,

    run: async(client, message, args, container) => {
      Object.assign(this, container)
        const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.reply({
   embeds: [
     new container.Discord.MessageEmbed()
     .setColor(container.Colors.RED)
     .setDescription(`There is no music currently playing!.`)
     .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
     .setTimestamp()
]
});

        const track = queue.current;

        const embed = new container.Discord.MessageEmbed();

        const progress = queue.createProgressBar();

        embed.setColor('RED');
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = ['disabled', 'track', 'queue'];

        const timestamp = queue.getPlayerTimestamp();
const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
const filters = [];
queue.getFiltersEnabled().map(x => filters.push(x));
queue.getFiltersDisabled().map(x => filters.push(x));


const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

const filtersUpdated = {};

      filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

        embed.setDescription(`Volume **${queue.volume}%**\nDuration **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\nFilter **${queue.getFiltersEnabled()}**`);

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