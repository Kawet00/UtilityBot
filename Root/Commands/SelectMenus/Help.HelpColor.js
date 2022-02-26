const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../Storage/json/colors.json')
const config = require('../../Storage/Vault/Config')

module.exports = {
    name: "HelpColor",
    run: async(client, interaction) => {
        var prefix = db.get(`prefix_${interaction.guild.id}` || config.prefix)
        let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

        interaction.user.send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(lang.commands.help.helpCo[0].replace('{PREFIX}', prefix))
                .setDescription(lang.commands.helpa[4])
                .addFields({
                    name: lang.commands.helpa[5],
                    value: lang.commands.help.helpCo[1]
                }, {
                    name: lang.commands.helpa[6],
                    value: `\`${prefix}color\``,
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
                    value: "`Util`"
                }, {
                    name: "Cooldown",
                    value: "10s"
                }, {
                    name: lang.commands.helpa[10],
                    value: lang.commands.helpa[11] + `\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            interaction.reply('Help sent with succes !')
        })
    }
}
