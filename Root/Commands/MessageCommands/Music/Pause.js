const db = require('quick.db');

module.exports = {
  name: 'pause',
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

    try {
    
    const queue = client.player.getQueue(message.guild.id);

       if (!queue || !queue.playing) return message.reply({
         embeds: [
           new container.Discord.MessageEmbed()
           .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
           .setColor(container.Colors.RED)
           .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
           .setTimestamp()
         ]
        });

        const success = queue.setPaused(true);

        return message.reply({
          embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(success ? `${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Pause[0].replace('{TITLE}', queue.current.title)}` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
          .setColor(success ? container.Colors.VERT : container.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
          ]
        });
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
}