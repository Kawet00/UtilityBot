module.exports = {
  name: 'filter',
  voiceChannel: true,

  run: async(client, message, args, container) => {
      const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.reply({
   embeds: [
     new container.Discord.MessageEmbed()
     .setColor(container.Colors.RED)
     .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
     .setThumbnail()
     .setDescription(`There is no music currently playing!. ❌`)
   ]
  });

      if (!args[0]) return message.channel.send(`Please enter a valid filter name. ❌\nAll filters are \`bassboost, bassboost_low, bassboost_high, 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, normalizer2, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, mono, mstlr, mstrr, compressor, expander, softlimiter, chorus, chorus2d, chorus3d, fadein, dim, earrape\``);

      const filters = [];
      queue.getFiltersEnabled().map(x => filters.push(x));
      queue.getFiltersDisabled().map(x => filters.push(x));

      const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

      if (!filter) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.RED)
          .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
          .setDescription(`I couldn't find a filter with this name. ❌\nAll filters are \`bassboost, bassboost_low, bassboost_high, 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, normalizer2, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, mono, mstlr, mstrr, compressor, expander, softlimiter, chorus, chorus2d, chorus3d, fadein, dim, earrape\``)
        ]
      });
      const filtersUpdated = queue.getFiltersEnabled()

      filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

      await queue.setFilters(filtersUpdated);

      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setColor(container.Colors.VERT)
          .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setThumbnail()
          .addField('\u200B', 'ㅤ')
          .addField('Filter applied', filter)
          .addField('Filter Status', queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive')
          .setDescription('**Remember**, if the music is long, the filter application time may be longer accordingly.')
        ]
      })
  },
};