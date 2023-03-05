const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'support',
    aliases: ["sp"],
    cooldown: 20000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${lang.commands.util.support[0].replace('{SupportServer}', "[support](https://discord.gg/R39FrwyZ7w)")}`)
                    .setURL('https://discord.gg/R39FrwyZ7w')
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
    }
}