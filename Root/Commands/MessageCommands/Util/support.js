const colors = require("../../../Storage/json/colors.json")
const db = require('quick.db');

module.exports = {
name: 'support',
aliases: ["sp"],
cooldown: 20000,

run: async (client, message, args, container) => {

let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
try {

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
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Support')
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