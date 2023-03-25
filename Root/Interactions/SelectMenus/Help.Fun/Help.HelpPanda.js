const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');

module.exports = {
    name: "HelpCat",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id);
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en');

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.help.helpPanda[1].replace('{PREFIX}', prefix))
                        .setDescription(lang.commands.helpa[4])
                        .addFields({
                            name: lang.commands.helpa[5],
                            value: lang.commands.help.helpPanda[2]
                        }, {
                            name: lang.commands.helpa[6],
                            value: `\`${prefix}panda\``,
                            inline: true
                        }, {
                            name: lang.commands.helpa[7],
                            value: `\`${prefix}cpa\``,
                            inline: true
                        }, {
                            name: lang.commands.helpa[2],
                            value: lang.commands.helpa[1]
                        }, {
                            name: lang.commands.helpa[9],
                            value: "`Fun`"
                        }, {
                            name: "Cooldown",
                            value: "10s"
                        }, {
                            name: lang.commands.helpa[10],
                            value: lang.commands.helpa[11]
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