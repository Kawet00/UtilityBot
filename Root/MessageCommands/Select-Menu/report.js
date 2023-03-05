const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'report',
    aliase: ["bug"],
    cooldown: 100000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('Report')
                .setPlaceholder(lang.commands.util.report[0])
                .addOptions([
                    {
                        label: lang.commands.util.report[2],
                        description: lang.commands.util.report[5],
                        value: 'bug',
                    },
                    {
                        label: lang.commands.util.report[3],
                        description: lang.commands.util.report[6],
                        value: 'ping'
                    },
                    {
                        label: lang.commands.util.report[4],
                        description: lang.commands.util.report[7],
                        value: 'other'
                    }
                ]),
        );
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${lang.commands.util.report[1]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.VERT)
            ],
            components: [row],
            allowedMentions: {
                repliedUser: false
            }
        })
    }
}