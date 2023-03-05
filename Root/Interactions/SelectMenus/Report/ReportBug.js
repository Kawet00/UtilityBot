const {getLang} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emoji = require('../../../Storage/json/emotes.json');
const { reportChannel } = require('../../../Storage/json/Config.json');

module.exports = {
    name: "bug",
    run: async (client, interaction) => {
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')

        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emoji.pepe.pepe_srx} ┇ ${lang.commands.util.report[8]}`)
                    .setColor(colors.PERSO)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        const filter = (m) => {
            return m.author.id === interaction.user.id
        }
        const collector = interaction.channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 60
        })

        collector.on('end', collected => {
            if (collected.length < 25) {
                interaction.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.EPINGLE)
                            .setDescription(`${emoji.pepe.pepe_a} ┇ ${lang.commands.util.report[18]}`)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                })
                return;
            }

            let text = ''

            collected.forEach((message) => {
                text += `${message.content}`
            });

            interaction.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setDescription(`${emoji.blob.blob_thx} ┇ ${lang.commands.util.report[9]}`)
                        .addFields(
                            { name: lang.commands.util.report[10], value: "`" + text }
                        )
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                client.channels.cache.get(reportChannel).send({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.RED)
                            .setDescription(`**${interaction.member.user.tag}** ${lang.commands.util.report[12]}`)
                            .addFields({
                                name: lang.commands.util.report[13],
                                value: interaction.user.id,
                                inline: false,
                            }, {
                                name: "\u200B",
                                value: "\u200B",
                                inline: false,
                            }, {
                                name: lang.commands.util.report[14],
                                value: interaction.guild.name,
                                inline: true,
                            }, {
                                name: lang.commands.util.report[15],
                                value: interaction.guild.id,
                                inline: true,
                            }, {
                                name: "\u200B",
                                value: "\u200B",
                                inline: false,
                            }, {
                                name: lang.commands.util.report[16],
                                value: 'Bug',
                                inline: false,
                            }, {
                                name: lang.commands.util.report[17],
                                value: "`" + text + "`",
                                inline: false
                            })
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                }).then(() => {
                    interaction.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(colors.VERT)
                                .setDescription(`${emoji.blob.blob_thx} ┇ ${lang.commands.util.report[19]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                })
            })/*.then(() => {
                interaction.channel.send({
                    embeds: [
                        new Discord.MessageEmbed()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emoji.blob.blob_p} ${lang.commands.util.report[11]}`)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                    ]
                }).then(m => {
                    m.react('👍')
                    m.react('👎')
                })
        
                const filter2 = (user) => {
                    return user.id === interaction.user.id
                }
        
                const collector2 = interaction.channel.createReactionCollector({
                    filter2,
                    max: 1,
                    time: 1000 * 20
                })
        
                collector2.on('collect', (reaction) => {
                    console.log(reaction.emoji.name)
                })
        
                collector2.on('end', () => {
                    if(reaction.name === '👍') {
                        interaction.channel.send('test')
                    }
                    if(reaction.name === '👎') {
                        interaction.channel.send('test2')
                    }
                })
            })*/
        })
    }
}