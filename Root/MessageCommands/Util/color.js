const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'color',
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6);

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(hex)
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.color[0].replace('{HEX}', hex)}`)
                    .setTitle("#" + hex)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}