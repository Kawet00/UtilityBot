const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'help-set-lang',
    aliases: ["h-s-la"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    run: async(client, message, args, container) => {

        var prefix = db.get(`prefix_${message.guild.id}` || container.Config.prefix)
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.help.helpSLa[1].replace('{PREFIX}', prefix))
            .setDescription(lang.commands.helpa[4])
            .addFields({
                name: lang.commands.helpa[5],
                value: lang.commands.help.helpSLa[2]
            }, {
                name: lang.commands.helpa[6],
                value: `\`${prefix}set-lang\``,
                inline: true
            }, {
                name: lang.commands.helpa[7],
                value: `\`${prefix}s-la\``,
                inline: true
            }, {
                name: lang.commands.helpa[2],
                value: lang.commands.helpa[1]
            }, {
                name: lang.commands.helpa[9],
                value: lang.commands.helpa[18]
            }, {
                name: "Cooldown",
                value: "30m"
            }, {
                name: lang.commands.helpa[10],
                value: lang.commands.helpa[17]+`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
            })
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
        ]
        })
    }
}