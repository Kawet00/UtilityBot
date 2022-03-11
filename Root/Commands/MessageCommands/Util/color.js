
const db = require('quick.db')

module.exports = {
  name: 'color',
  cooldown: 5000,
  onlyUsers: ["509765051435974692", "691644619758370846"],

  run: async (client, message, args, container) => {
    
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

    try {
      const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6);

      message.channel.send({
        embeds: [
          new container.Discord.MessageEmbed()
        .setColor(hex)
        .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.color[0].replace('{HEX}', hex)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
        .setTitle("#" + hex)
         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
        .setTimestamp()
        ]
      });
    } catch (err) {
      console.log(client.errors.genericError + err.stack).catch();
    }
  }
}