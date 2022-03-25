const db = require('quick.db');

module.exports = {
  name: "save",
  description: "save",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {
    
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

        message.author.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.blob.blob_b} ┇ ${lang.commands.music.Save[0]} **${queue.current.title}** | ${queue.current.author}, ${lang.commands.music.Save[1]} **${message.guild.name}**`)
          ]
        }) .then(() => {
            message.reply({
              embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.music.Save[2]}`)
              ]
            });
        }).catch(error => {
            message.reply({
              embeds: [
                new container.Discord.displayAvatarURL()
                .setColor(container.Colors.RED)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Save[3]}`)
              ]
            });
        });
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Save')
                  .addField('Erreur', `\`\`\`${e}\`\`\``)
                  .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                  .setTimestamp()
                  .setColor(colors.PERSO)
              ]
          })
          message.reply({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription(`${lang.commands.problem[0]}`)
                  .setColor(colors.EPINGLE)
                  .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                  .setTimestamp()
              ]
          })
          console.log(e)
        }
      }
    }