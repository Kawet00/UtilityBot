const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emotes = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "Music",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id)
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(`❓ ┇ ${lang.commands.help.music[0]}`)
                        .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .addFields({
                            name: `${emotes.blob.blob_p} ┇ BACK`,
                            value: lang.commands.help.music[2].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ CLEAR`,
                            value: lang.commands.help.music[3].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ FILTER`,
                            value: lang.commands.help.music[4].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ LOOP`,
                            value: lang.commands.help.music[5].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ NOW PLAYING`,
                            value: lang.commands.help.music[6].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ PAUSE`,
                            value: lang.commands.help.music[7].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ PLAY`,
                            value: lang.commands.help.music[8].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ QUEUE`,
                            value: lang.commands.help.music[9].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ RESUME`,
                            value: lang.commands.help.music[10].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ SAVE`,
                            value: lang.commands.help.music[11].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ SEARCH`,
                            value: lang.commands.help.music[12].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ SKIP`,
                            value: lang.commands.help.music[13].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ STOP`,
                            value: lang.commands.help.music[14].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ VOLUME`,
                            value: lang.commands.help.music[15].replace("{PREFIX}", prefix),
                            inline: true,
                        })
                ]
            }).then(() => {
                interaction.reply({
                    content: lang.commands.help.success[0],
                    ephemeral: true
                })
            })
        } catch (e) {
            interaction.reply(`Please active your DMs.`)
            console.log(e)
        }
    }
}