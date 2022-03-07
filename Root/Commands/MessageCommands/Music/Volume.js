const db = require('quick.db');

module.exports = {
  name: "volume",
  aliases: ["vol"],
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
    const maxVol = container.Config.opt.maxVol;
    const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.reply({
         embeds: [
           new container.Discord.MessageEmbed()
           .setColor(container.Colors.RED)
           .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
           .setTimestamp()
           .setDescription(`  ${lang.commands.music.AnyM[0]}`)
         ]
        });

        const vol = parseInt(args[0]);

        if (!vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.Volume[0]} **${queue.volume}** 🔊\n${lang.commands.music.Volume[1].replace('{MAXV}', maxVol)}`)
          ]
        });

        if (queue.volume === vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.Volume[2]}`)
          ]
        });

        if (vol < 0 || vol > maxVol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`  ${lang.commands.music.Volume[3]}`)
          ]
        });

        const success = queue.setVolume(vol).then(() => {
          db.set(`vol_${message.guild.id}`, vol)
        })

        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(success ? container.Colors.VERT : container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(success ? `${lang.commands.music.Volume[4]} **%${vol}**/**${maxVol}** 🔊` : `${lang.commands.music.SomethW[0]}`)
          ]
        });
  }
}