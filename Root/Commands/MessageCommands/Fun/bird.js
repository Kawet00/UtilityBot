const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'bird',
    aliases: ['bi'],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        const bird = [
            "https://cdn.discordapp.com/attachments/702865356720570458/749341891203432588/202984001.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749341979334279268/83553330_027624150-1.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342160792322138/les-plus-belles-photos-doiseaux-preselectionnees-pour-le-bird-photographer-of-the-year-2020.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342261015478343/91KsHZXfLPL.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342333455171714/frigatebird-5b045e571d640400376297a4.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342451118112783/maxresdefault.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342558378786836/63667361-480px.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342640767762488/blue-and-gold-macaw-credit-matts-lindh-creative-commons.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342730546577458/293884104_6090753213001_6090746198001-vs.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749342871961862164/al0cltzbklrx2nibjiy3eydhrjzmdobdqgkrmqj0wwisvg6fmaizzadaixrblhwb-.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749343006045503579/hqdefault.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749343095589568522/european_turtle_dove_streptopelia_turtur_websitec_revital_salomon.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749343171162538084/red-winged-blackbird-landing.png"
        ]
        const bird2 = bird[Math.floor(Math.random() * bird.length)];

        message.reply({ 
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(bird2)
            .setDescription(`${container.Emotes.bird} ${lang.commands.fun.animaux[2]} ${container.Emotes.bird}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setImage(bird2)
            .setFooter({ text: `© ${client.user.username} `, iconURL: client.user.avatarURL() })
            .setTimestamp()
            ]
        });
    }
};