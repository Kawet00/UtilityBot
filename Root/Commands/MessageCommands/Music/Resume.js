const db = require('quick.db');

module.exports = {
  name: "resume",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {
    
    const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
          ]
        });
        const success = queue.setPaused(false);

        return message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.VERT)
            .setDescription(success ? `${container.Emotes.autre.wumpus_dj} ┇ **${queue.current.title}**, ${lang.commands.music.Resume[0]}` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
          ]
        });
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Resume')
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