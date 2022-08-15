const db = require('quick.db')
const Discord = require('discord.js')
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const config = require('../../../Storage/json/Config.json')

module.exports = {
        name: "Info",
        run: async (client, interaction) => {
                var prefix = db.get(`prefix_${interaction.guild.id}`) || 't!'
                let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

                try {
                interaction.user.send({
                        embeds: [
                                new Discord.MessageEmbed()
                                .setColor(colors.PERSO)
                                .setTitle(`❓ ┇ ${lang.commands.help.info[0]}`)
                                .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
                                .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                })
                                .setTimestamp()
                                .addFields({
                                        name: `${emotes.blob.blob_p} ┇ PING`,
                                        value: lang.commands.help.info[2].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ UPTIME`,
                                        value: lang.commands.help.info[3].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ USERINFO`,
                                        value: lang.commands.help.info[4].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ BOTINFO`,
                                        value: lang.commands.help.info[5].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ CRYPTO PRICE`,
                                        value: lang.commands.help.info[6].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ ${lang.commands.help.info[1]}`,
                                        value: lang.commands.help.info[7].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.autre.cool_pika} ┇ INVITE`,
                                        value: lang.commands.help.info[8].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ SEARCH GITHUB`,
                                        value: lang.commands.help.info[9].replace("{PREFIX}", prefix),
                                        inline: true
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ GITHUB`,
                                        value: lang.commands.help.info[10].replace("{PREFIX}", prefix),
                                        inline: true
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ PEOPLE IN SPACE`,
                                        value: lang.commands.help.info[11].replace("{PREFIX}", prefix),
                                        inline: true
                                }, {
                                        name: `${emotes.blob.blob_p} ┇ YOUTUBE STATS`,
                                        value: lang.commands.help.info[12].replace("{PREFIX}", prefix) + `\n\n[${lang.commandsa[0]}](https://eternode.ga/)`,
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