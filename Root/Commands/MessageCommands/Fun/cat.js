const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {

    name: 'cat',
    aliases: ['c'],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        
        const cat = [
            "https://cdn.discordapp.com/attachments/702865356720570458/749332057049661490/images.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332145969037413/c8e06865-istock-909106260-copie-1200x675.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332260221747270/7794944772_deux-jeunes-chats-qui-se-reposent-photo-d-illustration.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332353679360070/les-10-points-clef-d-un-chat-en-forme.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332443940782160/e9eddf6_B3Y0d0aPpK74XJJv8JozssjG.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332541324132392/rts39c721.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332622953414686/le-sacre-de-birmanie-fait-partie-de-ces-chats-pot-de-colle-ils-s-entendent-bien-avec-les-autres-anim.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332717853736990/photo-1511275539165-cc46b1ee89bf.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332825777373214/033_5800455_5c7ac69389949_0.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332906660593704/Chat-clone7.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749332990630428772/5c92cf432300003300add93d.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749333097480323162/images.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749333183698567228/yerlin-matu-481826-unsplash.png"
        ]
        const catt = cat[Math.floor(Math.random() * cat.length)];

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(catt)
            .setDescription(`${emotes.autre.cat} ${lang.commands.fun.animaux[3]} ${emotes.autre.cat}`)
            .setImage(catt)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        });
    }
}