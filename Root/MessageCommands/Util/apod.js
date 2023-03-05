const request = require('node-superfetch');
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const {APOD_API_KEY} = require('../../Storage/json/Config.json');

module.exports = {
    name: 'apod',
    description: 'Responds with today\'s Astronomy Picture of the Day.',
    cooldown: 18000000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const {body} = await request
            .get('https://api.nasa.gov/planetary/apod')
            .query({api_key: APOD_API_KEY});
        const embed = new EmbedBuilder()
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
            .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()});

        return message.reply({embeds: [embed]});
    }
};

function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}