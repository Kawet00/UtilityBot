const {getLang, getPrefix} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emotes = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "Fun",
    run: async (client, interaction) => {
        let prefix = await getPrefix(interaction.guild.id)
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        try {
            interaction.user.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setTitle(`🎲 ┇ ${lang.commands.help.fun[0]}`)
                        .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .addFields({
                            name: `${emotes.blob.blob_p} ┇ 8BALL`,
                            value: lang.commands.help.fun[3].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {/*
                                        name: `${emotes.autre.dog} ┇ FUN DOG`,
                                        value: lang.commands.help.fun[4].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {*/
                            name: `${emotes.autre.dog} ┇ DOG`,
                            value: lang.commands.help.fun[5].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {/*
                                        name: `${emotes.autre.cat} ┇ FUN CAT`,
                                        value: lang.commands.help.fun[6].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {*/
                            name: `${emotes.autre.cat} ┇ CAT`,
                            value: lang.commands.help.fun[7].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {/*
                                        name: `${emotes.autre.fox} ┇ FUN FOX`,
                                        value: lang.commands.help.fun[8].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {*/
                            name: `${emotes.autre.fox} ┇ FOX`,
                            value: lang.commands.help.fun[9].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {/*
                                        name: `${emotes.autre.bird} ┇ FUN BIRD`,
                                        value: lang.commands.help.fun[10].replace("{PREFIX}", prefix),
                                        inline: true,
                                }, {*/
                            name: `${emotes.autre.bird} ┇ BIRD`,
                            value: lang.commands.help.fun[11].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.autre.bird} ┇ PANDA`,
                            value: lang.commands.help.fun[20].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_t} ┇ ${lang.commands.help.fun[1]}`,
                            value: lang.commands.help.fun[12].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_t} ┇ ${lang.commands.help.fun[2]}`,
                            value: lang.commands.help.fun[13].replace("{PREFIX}", prefix),
                            inline: true,
                        }, {
                            name: `${emotes.blob.blob_p} ┇ MESSAGE`,
                            value: lang.commands.help.fun[14].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.blob.blob_t} ┇ MESSAGE ANONYME`,
                            value: lang.commands.help.fun[15].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_ar} ┇ WANTED`,
                            value: lang.commands.help.fun[16].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.autre.intelligent} ┇ RESPECT+`,
                            value: lang.commands.help.fun[17].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ SLAP`,
                            value: lang.commands.help.fun[18].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ GIPHY`,
                            value: lang.commands.help.fun[19].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ RPS`,
                            value: lang.commands.help.fun[20].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ QUICK CLICK`,
                            value: lang.commands.help.fun[21].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ FIGHT`,
                            value: lang.commands.help.fun[22].replace("{PREFIX}", prefix),
                            inline: true
                        }, {
                            name: `${emotes.pepe.pepe_wa} ┇ GUESS THE NUMBER`,
                            value: lang.commands.help.fun[23].replace("{PREFIX}", prefix),
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