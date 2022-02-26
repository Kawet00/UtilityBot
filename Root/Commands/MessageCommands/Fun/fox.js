const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'fox',
    aliases: ["f"],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        
        const fox = [
            "https://cdn.discordapp.com/attachments/692324903432486952/749335532269469696/7794422396_un-renard-illustration.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749335665967366174/B9723500716Z.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749335770380238928/1200px-Zyuuzikitune.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749335873639678042/58c8a433459a45ed288b45a9.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749336013037371392/renard_shutterstock_754833847_ban.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749336131803545661/MulotageC2A9D.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749336302826291220/renard-polaire-pelage-hiver-web.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749339927073915040/0f9f104d15e5af864f430346b3075bf6-1546889811.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749340032745340988/allonge.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749340207152627872/images.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749340397972488232/533136.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749340475986542712/petit-renard-et-guirlande-de-lumiere-animaux-facile-renards-peinture-par-numeros-figuredart-free-shi.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749340564746403936/18f2fa9743_122742_12-2017ledoux-029-085.png"
        ]
        const fox2 = fox[Math.floor(Math.random() * fox.length)];

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(fox2)
            .setDescription(`${emotes.autre.fox} AAA ${emotes.autre.fox}`)
            .setImage(fox2)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        });
    }
}