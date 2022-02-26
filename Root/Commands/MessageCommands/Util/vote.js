const colors = require('../../../Storage/json/colors.json');
const db = require('quick.db');

module.exports = {
    name: 'vote',
    description: 'vote',
    onlyUsers: ["509765051435974692", "691644619758370846"],
    aliases: ["v"],
    cooldown: 20000,

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setDescription(`Not Disponible\n\n[${lang.commandsa[0]}](https://nepust.fr/)`/*`${lang.commands.util.Ui["6"].replace('{VoteForMe}', "[vote for me](https://top.gg/bot/787400372938735616/vote)")}🥰🥳😊`*/)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
          .setTimestamp()
            .setTitle('VOTE')
            .setURL('https://top.gg/bot/787400372938735616/vote')
            ]
        })
    },
};