const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../../Storage/json/colors.json')
const config = require('../../../Storage/Vault/Config')

module.exports = {
    name: "HelpQC",

    run: async(client, interaction) => {
        var prefix = db.get(`prefix_${interaction.guild.id}`) || 'u!'
        let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

        try {
        interaction.user.send({
            embeds: [
                new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.help.helpQC[1].replace('{PREFIX}', prefix))
            .setDescription(lang.commands.helpa[4])
            .addFields({
                name: lang.commands.helpa[5],
                value: lang.commands.help.helpQC[2]
            }, {
                name: lang.commands.helpa[6],
                value: `${prefix}quick-click`,
                inline: true
            }, {
                name: lang.commands.helpa[7],
                value: `\`${prefix}quick-clique\`\n\`${prefix}qc\`\n\`${prefix}q-c\``,
                inline: true
            },  {
                name: lang.commands.helpa[2],
                value: lang.commands.helpa[1]
            }, {
                name: lang.commands.helpa[9],
                value: "`Fun`"
            },  {
                name: "Cooldown",
                value: '10s'
            }, {
                name: lang.commands.helpa[10],
                value: lang.commands.helpa[11]+`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
            })
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
             .setTimestamp()
            ]
        }).then(() => {
            interaction.reply(lang.commands.help.success[0])
        })
    } catch {
            interaction.reply(`Please active your DMs.`)
    }
    }
}