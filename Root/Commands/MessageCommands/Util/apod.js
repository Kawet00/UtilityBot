const request = require('node-superfetch');
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
    name: 'apod',
    description: 'Responds with today\'s Astronomy Picture of the Day.',
    cooldown: 18000000,

    run: async (client, message, args, container) => {
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
      try {

            const { body } = await request
                .get('https://api.nasa.gov/planetary/apod')
                .query({ api_key: container.Config.APOD_API_KEY });
            const embed = new container.Discord.MessageEmbed()
                .setTitle(body.title)
                .setDescription(shorten(body.explanation))
                .setColor(colors.PERSO)
                .setAuthor({
                    name: `${lang.commands.util.apod[0]}`,
                    iconURL: 'https://i.imgur.com/Wh8jY9c.png',
                    url: 'https://apod.nasa.gov/apod/astropix.html'
                })
                .setImage(body.media_type === 'image' ? body.url : null)
                .setURL(body.url)
                .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() });
				
            return message.reply({ embeds: [embed] });
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Apod')
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

function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}