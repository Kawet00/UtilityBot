const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../Storage/json/colors.json')
const emoji = require('../../Storage/json/emotes.json')

module.exports = {
    name: "bug",
    run: async(client, interaction) => {
        let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

        const fmsg = interaction.reply(lang.commands.util.report[8])

        const filter = (m) => {
            return m.author.id === interaction.user.id
        }
        const collector = interaction.channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 60
        })

        collector.on('collect', message => {
            console.log(message.content)
        })

        collector.on('end', collected => {
            if (collected.size === 10) {
                interaction.channel.send('met du text stp')
                return;
            }

            let text = ''

            collected.forEach((message) => {
                text += `${message.content}\n`
            });

            interaction.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(colors.VERT)
                    .setDescription(`${emoji.autre.intelligent} ${lang.commands.util.report[9]}`)
                    .addField(lang.commands.util.report[10], "`" + text + "`")
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
                ]
            }).then(() => {
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
            })
        })

        

    }
}