const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emotes = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "Util",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id)
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .setTitle(`📚 ┇ ${lang.commands.help.util[0]}`)
                        .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
                        .addFields({
                            name: `${emotes.blob.blob_t} ┇ COLOR`,
                            value: lang.commands.help.util[7].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_b} ┇ VOTE`,
                            value: lang.commands.help.util[8].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ AVATAR`,
                            value: lang.commands.help.util[9].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_w} ┇ REPORT`,
                            value: lang.commands.help.util[10].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.blob.blob_t} ┇ ${lang.commands.help.util[2]} `,
                            value: lang.commands.help.util[11].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.intelligent} ┇ CALCUL`,
                            value: lang.commands.help.util[12].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.blob.blob_t} ┇ ${lang.commands.help.util[3]}`,
                            value: lang.commands.help.util[13].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_t} ┇ SUPPORT`,
                            value: lang.commands.help.util[14].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ REMIND`,
                            value: lang.commands.help.util[15].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.blob.blob_p} ┇ APOD`,
                            value: lang.commands.help.util[16].replace("{PREFIX}", prefix),
                            inline: true
                        })
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