const db = require('quick.db');

module.exports = {
  name: "save",
  description: "save",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    
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

        message.author.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`Registered track: **${queue.current.title}** | ${queue.current.author}, Saved server: **${message.guild.name}** ✅`)
          ]
        }) .then(() => {
            message.reply({
              embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`I sent the name of the music via private message. ✅`)
              ]
            });
        }).catch(error => {
            message.reply({
              embeds: [
                new container.Discord.displayAvatarURL()
                .setColor(container.Colors.RED)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`Unable to send you private message. ❌`)
              ]
            });
        });
      }
    }