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
           .setDescription(`There is no music currently playing!. ❌`)
         ]
        });

        const vol = parseInt(args[0]);

        if (!vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`Current volume: **${queue.volume}** 🔊\n**To change the volume, with \`1\` to \`${maxVol}\` Type a number between.**`)
          ]
        });

        if (queue.volume === vol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`The volume you want to change is already the current volume ❌`)
          ]
        });

        if (vol < 0 || vol > maxVol) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`**Type a number from \`1\` to \`${maxVol}\` to change the volume .** ❌`)
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
            .setDescription(success ? `Volume changed: **%${vol}**/**${maxVol}** 🔊` : `Something went wrong. ❌`)
          ]
        });
  }
}