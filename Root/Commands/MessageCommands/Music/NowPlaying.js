const db = require('quick.db');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  voiceChannel: true,

  run: async (client, message, args, container) => {

    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    Object.assign(this, container)
    const queue = client.player.getQueue(message.guild.id);

    if (!queue || !queue.playing) return message.reply({
      embeds: [
        new container.Discord.MessageEmbed()
        .setColor(container.Colors.RED)
        .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
        .setFooter({
          text: `© ${client.user.username}`,
          iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp()
      ]
    });

    const track = queue.current;

    const embed = new container.Discord.MessageEmbed();

    const progress = queue.createProgressBar();

    embed.setColor(container.Colors.PERSO);
    embed.setThumbnail(track.thumbnail);
    embed.setTitle(track.title)

    const methods = [lang.commands.music.NowP[0], 'track', lang.commands.music.NowP[1]];

    const timestamp = queue.getPlayerTimestamp();
    const trackDuration = timestamp.progress == lang.commands.music.NowP[4] ? lang.commands.music.NowP[5] : track.duration;
    const filter = ["bassboost", "8d"]

    if (queue.getFiltersEnabled() !== filter) {}
    if (queue.getFiltersEnabled().length < 1) {
      embed.setDescription(`${container.Emotes.autre.wumpus_dj} ┇ Volume **${queue.volume}%**\n${lang.commands.music.NowP[2]}  **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${lang.commands.music.NowP[7]} **${lang.commands.music.NowP[6]}**\n\n[${lang.commandsa[0]}](https://nepust.fr/)`);
    } else if (queue.getFiltersEnabled().length > 0) {
      embed.setDescription(`${container.Emotes.autre.wumpus_dj} ┇ Volume **${queue.volume}%**\n${lang.commands.music.NowP[2]}  **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${lang.commands.music.NowP[7]} **${queue.getFiltersEnabled()}**\n\n[${lang.commandsa[0]}](https://nepust.fr/)`);
    }


    embed.addField('\u200B', '\u200B')
    embed.addField(`Track, (${timestamp.progress}%)`, progress)
    embed.setTimestamp();
    embed.setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

    const row = new container.Discord.MessageActionRow().addComponents(
      new container.Discord.MessageButton()
      .setLabel(lang.commands.music.NowP[3])
      .setCustomId('saveBtn')
      .setStyle('SUCCESS')
    )

    message.reply({
      embeds: [embed],
      components: [row]
    });
  },
};