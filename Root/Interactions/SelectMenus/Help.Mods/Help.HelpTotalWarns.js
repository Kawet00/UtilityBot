const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');

module.exports = {
    name: "HelpTotalWarns",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id)
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.help.helpTw[1].replace('{PREFIX}', prefix))
                        .setDescription(lang.commands.helpa[5])
                        .addFields({
                            name: lang.commands.helpa[7],
                            value: lang.commands.help.helpTw[2]
                        }, {
                            name: lang.commands.helpa[8],
                            value: lang.commands.help.helpTw[3].replace('{PREFIX}', prefix),
                            inline: true
                        }, {
                            name: lang.commands.helpa[9],
                            value: `\`${prefix}t-w\``,
                            inline: true
                        }, {
                            name: lang.commands.helpa[2],
                            value: lang.commands.helpa[1]
                        }, {
                            name: lang.commands.helpa[11],
                            value: lang.commands.helpa[12]
                        }, {
                            name: "Cooldown",
                            value: "0s"
                        }, {
                            name: lang.commands.helpa[10],
                            value: lang.commands.helpa[14]
                        })
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                interaction.reply({
                    content: lang.commands.help.success[0],
                    ephemeral: true
                })
            })
        } catch {
            interaction.reply(`Please active your DMs.`)
        }
    }
}
