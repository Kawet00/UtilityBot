const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help`,
    aliases: [`h`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const embed =
            new EmbedBuilder()
                .setColor(colors.PERSO)
                .setDescription(`${lang.commands.helpa[24]}`)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('Help')
                .setPlaceholder(lang.commands.helpa[19])
                .addOptions([{
                    label: 'Util',
                    description: lang.commands.helpa[20],
                    value: 'Util',
                },
                    {
                        label: 'Mods',
                        description: lang.commands.helpa[21],
                        value: 'Mods'
                    },
                    {
                        label: 'Info',
                        description: lang.commands.helpa[22],
                        value: 'Info'
                    },
                    {
                        label: 'Fun',
                        description: lang.commands.helpa[23],
                        value: 'Fun'
                    },
                    {
                        label: 'Music',
                        description: lang.commands.helpa[23],
                        value: 'Music'
                    }
                ]),
        )
        message.reply({
            embeds: [embed],
            components: [row],
            allowedMentions: {
                repliedUser: false
            }
        })
    }
};