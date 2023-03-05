const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'donate',
    description: 'flm',
    aliases: ["don"],
    cooldown: 20000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setTitle("Donation")
                    .setDescription(`${lang.commands.util.don[0]}`)
                    .setURL('https://www.patreon.com/Elpistolero13')
            ]
        })
    }
}