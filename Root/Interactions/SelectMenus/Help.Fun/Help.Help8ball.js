const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');

module.exports = {
    name: "Help8ball",
    run: async (client, interaction) => {
        let prefix = getPrefix(interaction.guild.id);
        let lang = client.langs.get(getLang(interaction.guild.id) || 'en');

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.help.helpB[1].replace('{PREFIX}', prefix))
                        .setDescription(lang.commands.helpa[4])
                        .addFields({
                            name: lang.commands.helpa[5],
                            value: lang.commands.help.helpB[2]
                        }, {
                            name: lang.commands.helpa[6],
                            value: lang.commands.help.helpB[3].replace('{PREFIX}', prefix),
                            inline: true
                        }, {
                            name: lang.commands.helpa[7],
                            value: `\`${prefix}8b\n${prefix}ball\``,
                            inline: true
                        }, {
                            name: lang.commands.helpa[2],
                            value: lang.commands.helpa[1]
                        }, {
                            name: lang.commands.helpa[9],
                            value: "`Fun`"
                        }, {
                            name: "Cooldown",
                            value: "0s"
                        }, {
                            name: lang.commands.helpa[10],
                            value: lang.commands.helpa[11]
                        })
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
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