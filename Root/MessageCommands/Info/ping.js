const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    aliases: ["p", "pi", "pong"],
    description: "Savoir le ping du bot",
    name: "ping",
    cooldown: 5000,

    run: async (client, message) => {
        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .addFields(
                        {
                            name: `\`\`\`Latence:\`\`\``,
                            value: `**${latency}**ms`,
                            inline: true
                        }, {
                            name: `\`\`\`Discord API:\`\`\``,
                            value: `**${Math.round(client.ws.ping)}**ms`,
                            inline: true
                        }
                    )
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.PERSO)
            ]
        })
        msg.delete()
    }
};