const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'invite',
    description: 'none',
    cooldown: 20000,

    run: async (client, message) => {

        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.util.invite[0].replace('{UtilityBot}', '[invite Utility Bot](https://utilitybot.me/)')}`)
                    .setThumbnail(client.user.avatarURL({dynamic: true, size: 512}))
                    .setTitle(lang.commands.util.invite[1])
                    .setURL('https://utilitybot.me/')
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
    }
}