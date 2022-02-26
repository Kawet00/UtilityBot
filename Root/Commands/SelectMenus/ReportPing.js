const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../../Storage/json/colors.json')
const emoji = require('../../Storage/json/emotes.json')

module.exports = {
    name: "ping",
    run: async(client, interaction) => {
        let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

        const Lang = db.get(`lang_${interaction.guild.id}`)

        if(Lang == 'en') {
            interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`${emoji.pepe.pepe_a} ┇ You have already the English for the language of Utility Bot.\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.EPINGLE)
                    .setTimestamp()
                ]
            })
        } else if(Lang !== 'en') {
        db.set(`lang_${interaction.guild.id}`, 'en')
        interaction.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.VERT)
            .setDescription('New language of Utility Bot')
            .addField('The New language of Utility Bot is', `English\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        });
        }
    }
}