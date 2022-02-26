const db = require('quick.db')
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'set-ticket',
    aliase: ["s-t"],
    userPermissions: ["ADMINISTRATOR"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    cooldown: 1800000,

    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        message.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(lang.commands.owner.setT[0].replace('{TheBot}', `[Ticket Utility Bot](https://www.utilitybot.ga/buy/ticket-bot.html)\n\n[${lang.commandsa[0]}](https://nepust.fr/)`))
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        });
    }
}