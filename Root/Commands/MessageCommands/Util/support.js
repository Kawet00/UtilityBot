const colors = require("../../../Storage/json/colors.json")
const db = require('quick.db');

module.exports = {
name: 'support',
aliases: ["sp"],
cooldown: 20000,

run: async (client, message, args, container) => {

let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

message.reply({
  embeds: [
new container.Discord.MessageEmbed()
.setColor(colors.PERSO)
.setDescription(`${lang.commands.util.support[0].replace('{SupportServer}', "[support](https://discord.gg/R39FrwyZ7w)")}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
.setURL('https://discord.gg/R39FrwyZ7w')
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
  ]
        })
}
}