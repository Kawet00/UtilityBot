const db = require('quick.db')
const Discord = require('discord.js')
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: "Mods",
        run: async (client, interaction) => {
                var prefix = db.get(`prefix_${interaction.guild.id}`)
                if (prefix == null) prefix = config.prefix;
                let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

                interaction.user.send({
                        embeds: [
                                new Discord.MessageEmbed()
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
                                        },
                                         {
                                                                name: `${emotes.autre.cool_pika} ┇ DELETE-WARNS`,
                                                                value: lang.commands.help.moderation[7].replace("{PREFIX}", prefix),
                                                                inline: true
                                                        }, 
                                        {
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
                                                value: `${prefix}set-lang\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                                                inline: true
                                        })
                        ]
                }).then(() => {
                        interaction.reply(lang.commands.help.sucess[0])
                })
        }
}