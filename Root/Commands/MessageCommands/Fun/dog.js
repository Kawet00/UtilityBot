
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')
const r2 = require('r2');
const querystring = require('querystring');
const { ANIMALS_API_KEY, DOG_API_URL } = require('../../../Storage/Vault/Config')
const Discord = require('discord.js')

module.exports = {
    name: 'dog',
    aliases: ["d"],
    cooldown: 10000,

    run: async(client, message) => {
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
      
      try {
        messageRecieved(message);
        setTimeout(() =>{
          message.delete();
        }, 300)
      } catch (e) {
          client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
              embeds: [
                  new container.Discord.MessageEmbed()
                  .setDescription('Petit problème avec un utilisateur.')
                  .addField('Nom de la commande', 'Dog')
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

async function messageRecieved(message)
{
  try{

    var images = await loadImage(message.author.username);
    
    var image = images[0];

    message.reply({
        embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(image.url)
            .setDescription(`${container.Emotes.autre.dog}`)
            .setImage(image.url)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
        ]
    });

  
  } catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Dog')
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

async function loadImage(sub_id)
{
  var headers = {
      'X-API-KEY': ANIMALS_API_KEY,
  }
  var query_params = {
    'has_breeds':true,
    'mime_types':'jpg,png',
    'size':'small',
    'sub_id': sub_id,
    'limit' : 1
  }

  let queryString = querystring.stringify(query_params);

  try {
    let _url = DOG_API_URL + `v1/images/search?${queryString}`;

    var response = await r2.get(_url , {headers} ).json
  
  } catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Dog')
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
  return response;

}