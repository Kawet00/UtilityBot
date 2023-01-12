const db = require('quick.db');

module.exports = {
    name: "queue",
    description: "queue",
    aliases: ["q"],
    voiceChannel: true,

    run: async(client, message, args, container) => {
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
      try {
      
      const queue = client.player.getQueue(message.guild.id);

 
        if (!queue || !queue.playing) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.EPINGLE)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.AnyM[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
          ]
        });

        if (!queue.tracks[0]) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.EPINGLE)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.music.Queue[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
          ]
        });

        const embed = new container.Discord.MessageEmbed();
        const methods = ['🔁', '🔂'];

        embed.setColor(container.Colors.PERSO);
        embed.setThumbnail(message.guild.iconURL({ size: 2048, dynamic: true }));
        embed.setTitle(`${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Queue[1]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (${lang.commands.music.Queue[2]} <@${track. requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `${lang.commands.music.Queue[3]} **${songs - 5}** ${lang.commands.music.Queue[4]}` : `${lang.commands.music.Queue[5].replace('{SONGS}', songs)}`;

        embed.setDescription(`${lang.commands.music.Queue[6]} \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs }\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`);

        embed.setTimestamp();
        embed.setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

        message.reply({
          embeds: [embed]
        });
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Queue')
                  .addField('Erreur', `\`\`\`${e}\`\`\``)
                  .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                  .setTimestamp()
                  .setColor(container.Colors.PERSO)
              ]
          })
          message.reply({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription(`${lang.commands.problem[0]}`)
                  .setColor(container.Colors.EPINGLE)
                  .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                  .setTimestamp()
              ]
          })
          console.log(e)
        }
    }
  }