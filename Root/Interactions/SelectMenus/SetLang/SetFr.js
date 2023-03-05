const {getLang, updateLang} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emoji = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "fr",
    run: async (client, interaction) => {
        const Lang = await getLang(interaction.guild.id)

        if (Lang === 'fr') {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emoji.pepe.pepe_a} ┇ Vous utiliser déjà le français comme langue pour Utility Bot.`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        } else if (Lang !== 'fr') {
            updateLang(interaction.guild.id, 'fr');
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setDescription('Changement de la langue de Utility Bot')
                        .addFields(
                            { name: 'La Nouvelle langue de Utility Bot est', value :'Français' }
                        )
                        .setTimestamp()
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                ]
            });
        }
    }
}