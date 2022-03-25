const fetch = require('node-fetch');
const db = require('quick.db');

module.exports = {
      name: 'meme',
      aliases: ['me'],
      cooldown: 10000,

  run: async(client, message, args, container) => {

    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

    try {
      let res = await fetch('https://meme-api.herokuapp.com/gimme');
      res = await res.json();
      message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
              .setTitle(res.title)
              .setImage(res.url)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(container.Colors.PERSO)
          ]
      });
    setTimeout(() =>{
      message.delete();
    }, 300)
  } catch (e) {
      client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
          embeds: [
              new container.Discord.MessageEmbed()
              .setDescription('Petit problème avec un utilisateur.')
              .addField('Nom de la commande', 'Meme')
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
};