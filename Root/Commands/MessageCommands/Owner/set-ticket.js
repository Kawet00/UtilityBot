const db = require('quick.db')

const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'set-ticket',
    aliase: ["s-t"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        let langg = db.get(`lang_${message.guild.id}`)

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(lang.commands.owner.setT[0].replace('{TheBot}', `[Ticket Utility Bot](https://www.utilitybot.ga/${langg}#shop)\n\n[${lang.commandsa[0]}](https://nepust.fr/)`))
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        });
    }
}