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
    } catch (err) {
      message.reply(lang.commands.fun.meme[0], err.message);
    }
    setTimeout(() =>{
      message.delete();
    }, 300)
  }
};