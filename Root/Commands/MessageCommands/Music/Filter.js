module.exports = {
  name: 'filter',
  voiceChannel: true,

  run: async(client, message, args) => {
      const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.channel.send(`${message.author}, There is no music currently playing!. ❌`);

      if (!args[0]) return message.channel.send(`${message.author}, Please enter a valid filter name. ❌\nAll filters are \`bassboost, bassboost_low, bassboost_high 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, normalizer2, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, mono, mstlr, mstrr, compressor, expander, softlimiter, chorus, chorus2d, chorus3d, fadein, dim, earrape\``);

      const filters = [];
      queue.getFiltersEnabled().map(x => filters.push(x));
      queue.getFiltersDisabled().map(x => filters.push(x));

      const filter = filters.find((x) => x.toLowerCase() === args[0].toLowerCase());

      if (!filter) return message.channel.send(`${message.author}, I couldn't find a filter with this name. ❌\nAll filters are \`bassboost, bassboost_low, bassboost_high 8D, vaporwave, nightcore, phaser, tremolo, vibrato, reverse, treble, normalizer, normalizer2, surrounding, pulsator, subboost, karaoke, flanger, gate, haas, mcompand, mono, mstlr, mstrr, compressor, expander, softlimiter, chorus, chorus2d, chorus3d, fadein, dim, earrape\``);

      const filtersUpdated = {};

      filtersUpdated[filter] = queue.getFiltersEnabled().includes(filter) ? false : true;

      await queue.setFilters(filtersUpdated);

      message.channel.send(`Applied: **${filter}**, Filter Status: **${queue.getFiltersEnabled().includes(filter) ? 'Active' : 'Inactive'}** ✅\n **Remember, if the music is long, the filter application time may be longer accordingly.**`);
  },
};