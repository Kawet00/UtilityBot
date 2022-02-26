const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'pile-ou-face',
    description: 'flm',
    aliases: ["pf", "heads-or-tails", "h-o-t"],
    cooldown: 5000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        const pf = [
            `🥇 ┇ ${lang.commands.fun.pf[0]}`,
            `🥈 ┇ ${lang.commands.fun.pf[1]} `
        ]
        const pf2 = pf[Math.floor(Math.random() * pf.length)];
        message.reply({
            embeds: [
            new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setDescription(pf2)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            ]
        })
    }
}