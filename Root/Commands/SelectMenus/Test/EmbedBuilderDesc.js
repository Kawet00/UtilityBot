const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../../Storage/json/colors.json')
const emoji = require('../../../Storage/json/emotes.json')

module.exports = {
    name: "EmbedBuilderDesc",
    run: async(client, interaction) => {
        const filterR = (user) => user.id === interaction.user.id && !user.bot;
        const filterM = (m) => m.author.id === interaction.user.id && !m.author.bot;
        const collectorR = await new Discord.ReactionCollector(filterR);
        collectorR.on('collect', async () => {
        const msgQD = await interaction.channel.send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${emoji.pepe.pepe_srx}  ${lang.commands.util.embed[18]}`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
        ]
        });
        const description =  (await interaction.channel.awaitMessages({filterM, max: 1, time: 60000})).first()?.content;
        if(description == null) {
            msgQD.delete()
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
        msgQD.delete();
        db.set('embedB', { guild: interaction.guild.id, desc: description })
        
            interaction.channel.send({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`${emoji.blob.blob_g}  ${lang.commands.util.embed[19]}`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
            }).then(m => {
                setTimeout(() => {
                m.delete()
                }, 5000)
            });
        })
    }
}