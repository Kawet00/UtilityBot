const db = require('quick.db');

module.exports = {
  name: "volume",
  aliases: ["vol"],
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

    try {
    
    const maxVol = container.Config.opt.maxVol;
    const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.reply({
         embeds: [
           new container.Discord.MessageEmbed()
           .setColor(container.Colors.RED)
           .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
           .setTimestamp()
           .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
         ]
        });

        const vol = parseInt(args[0]);

        if (!vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Volume[0]} **${queue.volume}** 🔊\n${lang.commands.music.Volume[1].replace('{MAXV}', maxVol)}`)
          ]
        });

        if (queue.volume === vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Volume[2]}`)
          ]
        });

        if (vol < 0 || vol > maxVol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.music.Volume[3]}`)
          ]
        });

        const success = queue.setVolume(vol)

        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(success ? container.Colors.VERT : container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(success ? `${container.Emotes.pepe.pepe_ok} ┇ ${lang.commands.music.Volume[4]} **%${vol}**/**${maxVol}** 🔊` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
          ]
        });
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Volume')
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