const db = require('quick.db')
const Discord = require('discord.js')
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const { getPrefix, getLang } = require('../../../Storage/db/manager')

module.exports = {
        name: "Util",
        run: async (client, interaction) => {
                var prefix = getPrefix(interaction.guild.id)
                let lang = client.langs.get(getLang(interaction.guild.id))

                try {
                interaction.user.send({
                        embeds: [
                                new Discord.MessageEmbed()
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
                                        value: `${prefix}report`,
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
                                        value: lang.commands.help.util[16].replace("{PREFIX}", prefix) + `\n\n[${lang.commandsa[0]}](https://clh-c.com/)`,
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