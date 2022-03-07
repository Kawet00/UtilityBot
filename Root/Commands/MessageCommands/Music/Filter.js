const db = require('quick.db');

module.exports = {
  name: 'filter',
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
      const queue = client.player.getQueue(message.guild.id);

 if (!queue || !queue.playing) return message.reply({
   embeds: [
     new container.Discord.MessageEmbed()
     .setColor(container.Colors.RED)
     .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
     .setThumbnail()
     .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
   ]
  });

      if (!args[0]) return message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Filter[0].replace('{PREFIX}', container.PREFIX)}`)
          .setColor(container.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      });

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
          .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Filter[1].replace('{PREFIX}', container.PREFIX)}`)
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
          .addField(lang.commands.music.Filter[2], filter)
          .setDescription(`${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Filter[3]}`)
        ]
      })
  },
};