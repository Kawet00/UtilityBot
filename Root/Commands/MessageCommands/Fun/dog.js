const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'dog',
    aliases: ["d"],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));
        
        const dog = [
            "https://cdn.discordapp.com/attachments/732371156119584871/749328804589207604/2Q.png",
            "https://cdn.discordapp.com/attachments/732371156119584871/749329022747672607/chien-175531.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749329559349887126/cover-r4x3w1000-5eda126862738-german-shepherd-3404340-1920.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749329653835104347/sur-les-lieux-six-chiens.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749329873788600430/home-blanscape-et-istock-min-600x420.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749329991262797974/images.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330130303844402/1323917-chiens-de-traineaux-grande-odyssee-fra.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330239087313026/526207-puis-je-promener-mon-chien-pendant-le-co-953x0-3.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330344938963054/2362_fr_moyenvl-adoption-de-chiens-du-nord-du-quebec.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330466271789096/qui-sont-les-ancetres-chien.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330641593696276/12430318-chien-adulte-belle-le-husky-de-sibC3A9rie.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330776281186435/chien_berger_allemand_2-1024x576.png",
            "https://cdn.discordapp.com/attachments/702865356720570458/749330885941133352/26222970057_fd5fa9aeef_e.png"
        ]
        const dog2 = dog[Math.floor(Math.random() * dog.length)];

        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(lang.commands.fun.animaux[0])
                .setURL(dog2)
                .setDescription(`${emotes.autre.dog} ${lang.commands.fun.animaux[1]}  ${emotes.autre.dog}`)
                .setImage(dog2)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        });
    }
}