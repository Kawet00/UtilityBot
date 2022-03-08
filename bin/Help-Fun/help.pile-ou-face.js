const db = require('quick.db')
const colors = require('../../Root/Storage/json/colors.json')

module.exports = {
    name: 'help-pile-ou-face',
    aliases: ["h-pf"],

    run: async (client, message, args, container) => {

        var prefix = db.get(`prefix_${message.guild.id}` || container.Config.prefix)
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(lang.commands.help.helpPF[0].replace('{PREFIX}', prefix))
                .setDescription(lang.commands.helpa[4])
                .addFields({
                    name: lang.commands.helpa[5],
                    value: lang.commands.help.helpPF[1]
                }, {
                    name: lang.commands.helpa[6],
                    value: `\`${prefix}heads-of-tails\``,
                    inline: true
                }, {
                    name: lang.commands.helpa[7],
                    value: `\`${prefix}pf\`\n\`${prefix}pile-ou-face\`\n\`${prefix}h-o-t\``,
                    inline: true
                },  {
                    name: lang.commands.helpa[2],
                    value: lang.commands.helpa[1]
                }, {
                    name: lang.commands.helpa[9],
                    value: "`Fun`"
                }, {
                    name: "Cooldown",
                    value: "5s"
                }, {
                    name: lang.commands.helpa[10],
                    value: lang.commands.helpa[11] + `\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })
    }
}