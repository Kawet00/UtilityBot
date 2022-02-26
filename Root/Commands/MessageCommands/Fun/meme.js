const fetch = require('node-fetch');
const db = require('quick.db');

module.exports = {
      name: 'meme',
      aliases: ['me'],
      cooldown: 10000,
      onlyUsers: ["509765051435974692", "691644619758370846"],

  run: async(client, message, args, Discord) => {
    client.langs = new Discord.Collection()
    
          const Handler = require(`../../../Structures/Handlers/Handler`);
      await Handler.loadLangs(client);

    let lang = client.langs.get(db.get(`lang_${message.guild.id}`))

    try {
      let res = await fetch('https://meme-api.herokuapp.com/gimme');
      res = await res.json();
      message.reply({
          embeds: [
            new Discord.MessageEmbed()
              .setTitle(res.title)
              .setImage(res.url)
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setTimestamp()
              .setColor(message.guild.me.displayHexColor)
          ]
      });
    } catch (err) {
      message.reply(lang.commands.fun.meme[0], err.message);
    }
  }
};