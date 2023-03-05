const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'uptime',
    description: 'none',
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${emotes.autre.cool_pika} ┇ Uptime : ${days} ${lang.commands.util.uptime[0]}, ${hours} ${lang.commands.util.uptime[1]}, ${minutes} ${lang.commands.util.uptime[2]}, ${seconds} ${lang.commands.util.uptime[3]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}