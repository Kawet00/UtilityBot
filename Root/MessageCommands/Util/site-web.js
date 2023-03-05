const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'site-web',
    description: 'flm',
    aliases: ["s-w", "website", "w-s"],
    cooldown: 20000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setTitle(lang.commands.util.Sw[0])
                    .setDescription(`${lang.commands.util.Sw[1].replace('{WebSite}', `[${lang.commands.util.Sw[0]}](https://utilitybot.me/)`)}`)
                    .setURL('https://utilitybot.me/')
            ]
        })
    }
}