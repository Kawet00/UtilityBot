const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../../Storage/json/colors.json')
const emoji = require('../../../Storage/json/emotes.json')

module.exports = {
    name: "EmbedBuilderTitle",
    run: async(client, interaction) => {
        const filterR = (user) => user.id === interaction.user.id && !user.bot;
        const filterM = (m) => m.author.id === interaction.user.id && !m.author.bot;
        const collectorR = interaction.channel.createReactionCollector(filterR);
        collectorR.on('collect', async () => {
                    const msgQT = await interaction.channel.send({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setDescription(`${emoji.pepe.pepe_srx}  ${lang.commands.util.embed[16]}`)
                            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                    });
                    const title =  (await interaction.channel.awaitMessages({filter: filterM, max: 1, time: 60000})).first()?.content;
                    if(title == null) {
                        msgQT.delete()
                        interaction.channel.send({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setDescription(`${emoji.pepe.pepe_a}  ${lang.commands.util.embed[45]}`)
                            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                            .setTimestamp()
                            .setColor(colors.EPINGLE)
                        ]
                    })
                }
                    msgQT.delete();
                    db.set(`embedB`, { guild: interaction.guild.id, title: title })
                    
                        interaction.channel.send({
                            embeds: [
                                new Discord.MessageEmbed()
                                .setDescription(`${emoji.blob.blob_g}  ${lang.commands.util.embed[17]}`)
                                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                }
        )}
            }