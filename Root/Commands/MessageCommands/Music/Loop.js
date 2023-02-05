const {
  QueueRepeatMode
} = require('discord-player')
const db = require('quick.db');

module.exports = {
  name: "loop",
  description: "loop",
  aliases: ["lp"],
  voiceChannel: true,

  run: async (client, message, args, container) => {

    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {

    const queue = client.player.getQueue(message.guild.id);


    if (!queue || !queue.playing) return message.reply({
      embeds: [
        new container.Discord.MessageEmbed()
        .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
        .setColor(container.Colors.RED)
        .setFooter({
          text: `© ${client.user.username}`,
          iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp()
      ]
    });

    if (args[0] === 'queue') {
      if (queue.repeatMode === 1) return message.reply({
        embeds: [

          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Loop[0].replace('{PREFIX}', container.PREFIX)}`)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
          .setColor(container.Colors.RED)
        ]
      })

      const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

      return message.reply({
        embeds: [

          new container.Discord.MessageEmbed()
          .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? `${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.music.Loop[1]}` : `${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Loop[2]}`}**, ${lang.commands.music.Loop[3]}` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
          .setColor(success ? container.Colors.VERT : container.Colors.RED)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      });
    } else {
      if (queue.repeatMode === 2) return message.reply({
        embeds: [

          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Loop[4].replace('{PREFIX}', container.PREFIX)}`)
          .setColor(container.Colors.RED)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      });

      const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

      return message.reply({
        embeds: [

          new container.Discord.MessageEmbed()
          .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? `${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.music.Loop[1]}` : `${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Loop[2]}`}**, ${lang.commands.music.Loop[5].replace('{PREFIX}', container.PREFIX)}` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
          .setColor(success ? container.Colors.VERT : container.Colors.RED)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      });
    };
  } catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Pause')
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
};