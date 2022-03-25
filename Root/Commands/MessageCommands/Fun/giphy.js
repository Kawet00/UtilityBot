const request = require('node-superfetch');
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'giphy',
    aliases: ["gif"],
    
    run: async (client, message, [ ...query ], container) => {
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

      try {

          if(!query) return message.reply({
            embeds: [
              new Discord.MessageEmbed()
              .setDescription(`${lang.commands.fun.gif[0]}`)
              .setTimestamp()
              .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setColor(colors.EPINGLE)
            ]
          })
            const { body } = await request
                .get('http://api.giphy.com/v1/gifs/search')
                .query({
                    q: query,
                    api_key: container.Config.GIPHY_API_KEY,
                    rating: message.channel.nsfw ? 'r' : 'pg'
                });
            if (!body.data.length) return message.reply({
              embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${lang.commands.fun.gif[1]}`)
              .setTimestamp()
              .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setColor(colors.RED)
              ]
            });
            return message.reply({
              embeds: [
                new container.Discord.MessageEmbed()
                .setImage(body.data[Math.floor(Math.random() * body.data.length)].images.original.url)
                .setTimestamp()
                .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setColor(colors.PERSO)
              ]
            });
          } catch (e) {
              client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                  embeds: [
                      new container.Discord.MessageEmbed()
                      .setDescription('Petit problème avec un utilisateur.')
                      .addField('Nom de la commande', 'Giphy')
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