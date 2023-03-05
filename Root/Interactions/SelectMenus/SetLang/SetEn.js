const {getLang, updateLang} = require('../../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../../Storage/json/colors.json');
const emoji = require('../../../Storage/json/emotes.json');

module.exports = {
    name: "en",
    run: async (client, interaction) => {
        const Lang = await getLang(interaction.guild.id);

        if (Lang === 'en') {
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emoji.pepe.pepe_a} ┇ You have already the English for the language of Utility Bot.`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setColor(colors.EPINGLE)
                        .setTimestamp()
                ]
            })
        } else if (Lang !== 'en') {
            updateLang(interaction.guild.id, 'en')
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setDescription('New language of Utility Bot')
                        .addFields(
                            { name: 'The New language of Utility Bot is', value: 'English' }
                        )
                        .setTimestamp()
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                ]
            });
        }
    }
}