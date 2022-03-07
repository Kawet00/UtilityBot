const db = require('quick.db');

module.exports = {
    name: "queue",
    description: "queue",
    aliases: ["q"],
    voiceChannel: true,

    run: async(client, message, args, container) => {
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
      
      const queue = client.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.AnyM[0]}`)
          ]
        });

        if (!queue.tracks[0]) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.Queue[0]}`)
          ]
        });

        const embed = new container.Discord.MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor(container.Colors.PERSO);
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`  ${lang.commands.music.Queue[1]} - ${message.guild.name} ${methods[queue.repeatMode]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (${lang.commands.music.Queue[2]} <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `${lang.commands.music.Queue[3]} **${songs - 5}** ${lang.commands.music.Queue[4]}` : `${lang.commands.music.Queue[5].replace('{SONGS}', songs)}`;

        embed.setDescription(`${lang.commands.music.Queue[6]} \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }`);

        embed.setTimestamp();
        embed.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        message.reply({
          embeds: [embed]
        });
    }
  }