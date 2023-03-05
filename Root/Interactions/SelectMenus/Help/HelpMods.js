const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emotes = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "Mods",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id)
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.help.moderation[0])
                        .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .addFields({
                            name: `${emotes.autre.banned} ┇ BAN`,
                            value: lang.commands.help.moderation[1].replace('{PREFIX}', prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_c} ┇ KICK`,
                            value: lang.commands.help.moderation[2].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.mute} ┇ TIMEOUT`,
                            value: lang.commands.help.moderation[14]
                        }, {
                            name: `${emotes.autre.mute} ┇ MUTE`,
                            value: lang.commands.help.moderation[3].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.unmute} ┇ UNMUTE`,
                            value: lang.commands.help.moderation[4].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.giveaway_1} ┇ START GIVEAWAY`,
                            value: lang.commands.help.util[5].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.giveaway_2} ┇ REROLL GIVEAWAY`,
                            value: lang.commands.help.util[6].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_t} ┇ ${lang.commands.help.util[1]}`,
                            value: lang.commands.help.util[4].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ CLEAR`,
                            value: lang.commands.help.moderation[5].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_w} ┇ WARN`,
                            value: lang.commands.help.moderation[6].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.cool_pika} ┇ DELETE-WARNS`,
                            value: lang.commands.help.moderation[7].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.blob.blob_t} ┇ TOTAL WARNS`,
                            value: lang.commands.help.moderation[8].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_s} ┇ SET PREFIX`,
                            value: lang.commands.help.moderation[9].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_s} ┇ SET WELCOME`,
                            value: lang.commands.help.moderation[10].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_s} ┇ SET BYE`,
                            value: lang.commands.help.moderation[11].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.intelligent} ┇ SET LOGS`,
                            value: lang.commands.help.moderation[12].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.intelligent} ┇ SET LANG`,
                            value: `${prefix}set-lang`,
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