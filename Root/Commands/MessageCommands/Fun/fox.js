const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')
const fetch = require('node-fetch');

module.exports = {
    name: 'fox',
    aliases: ["f"],
    cooldown: 10000,

    run: async(client, message, args, container) => {
        
      let res = await fetch('https://randomfox.ca/floof');
      res = await res.json();
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(res.link)
            .setDescription(`${container.Emotes.autre.fox} AAA ${container.Emotes.autre.fox}`)
            .setImage(res.image)
             .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        });
        setTimeout(() =>{
            message.delete();
          }, 300)
    }
}