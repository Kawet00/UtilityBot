const db = require('quick.db')
const Discord = require('discord.js')
const emoji = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')

module.exports = {
    name: "fr",
    run: async(client, interaction) => {
        let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

        const Lang = db.get(`lang_${interaction.guild.id}`)

        if(Lang == 'fr') {
            interaction.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setDescription(`${emoji.pepe.pepe_a} ┇ Vous utiliser déjà le français comme langue pour Utility Bot.\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    .setColor(colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            })
        } else if(Lang !== 'fr'){
        db.set(`lang_${interaction.guild.id}`, 'fr')
        interaction.reply({
            embeds: [
            new Discord.MessageEmbed()
            .setColor(colors.VERT)
            .setDescription('Changement de la langue de Utility Bot')
            .addField('La Nouvelle langue de Utility Bot est', `Français\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        });
        }
    }
}