const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'help-timeout',
    aliases: ["h-t"],
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async (client, message, args, container) => {

        var prefix = db.get(`prefix_${message.guild.id}` || container.Config.prefix)
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(lang.commands.help.helpTi[0].replace('{PREFIX}', prefix))
                .setDescription(lang.commands.helpa[4])
                .addFields({
                    name: lang.commands.helpa[5],
                    value: lang.commands.help.helpTi[1]
                }, {
                    name: lang.commands.helpa[6],
                    value: lang.commands.help.helpTi[2],
                    inline: true
                }, {
                    name: lang.commands.helpa[7],
                    value: lang.commands.helpa[8],
                    inline: true
                },  {
                    name: lang.commands.helpa[2],
                    value: lang.commands.helpa[1]
                }, {
                    name: lang.commands.helpa[9],
                    value: lang.commands.helpa[12]
                }, {
                    name: "Cooldown",
                    value: "0s"
                }, {
                    name: lang.commands.helpa[10],
                    value: lang.commands.helpa[14] + `\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })
    }
}