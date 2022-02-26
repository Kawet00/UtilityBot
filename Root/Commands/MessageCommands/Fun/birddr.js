const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {

    name: 'fun-bird',
    aliases: ['f-bi'],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));
        
        const birddr = [
            "https://media.giphy.com/media/5PSPV1ucLX31u/giphy.gif",
            "https://media.giphy.com/media/LZElUsjl1Bu6c/giphy.gif",
            "https://media.giphy.com/media/bvnoMS2RpDuSY/giphy.gif",
            "https://media.giphy.com/media/6mr2y6RGPcEU0/giphy.gif",
            "https://media.giphy.com/media/nQZVy7bYWEKK4/giphy.gif",
            "https://media.giphy.com/media/vsGnvQD0ZcQco/giphy.gif",
            "https://media.giphy.com/media/l0HlIo3bPNiMUABt6/giphy.gif",
            "https://media.giphy.com/media/1n5eMh3mUUw12/giphy.gif",
            "https://media.giphy.com/media/121rAYEbiE01oI/giphy.gif",
            "https://media.giphy.com/media/BU1rWEqbUTXWw/giphy.gif",
            "https://media.giphy.com/media/5Dr8VvwXGngbe/giphy.gif",
            "https://media.giphy.com/media/1hWHUCgi3wKT6/giphy.gif",
            "https://media.giphy.com/media/WP2ujrEnniG2mSyxgM/giphy.gif"
        ]
        const birdd = birddr[Math.floor(Math.random() * birddr.length)];

        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(birdd)
            .setDescription(`${emotes.autre.bird} ${lang.commands.fun.animaux[2]} ${emotes.autre.bird}`)
            .setImage(birdd)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
        ]});
    }
}