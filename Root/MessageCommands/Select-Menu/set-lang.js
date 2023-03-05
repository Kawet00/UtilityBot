const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'set-lang',
    aliase: ["s-la"],
    userPermissions: ["Administrator"],
    cooldown: 1800000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('Set lang')
                .setPlaceholder(lang.commands.owner.setL[0])
                .addOptions([
                    {
                        label: lang.commands.owner.setL[2],
                        description: lang.commands.owner.setL[4],
                        value: 'en',
                    },
                    {
                        label: lang.commands.owner.setL[3],
                        description: lang.commands.owner.setL[5],
                        value: 'fr'
                    }
                ]),
        );
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${lang.commands.owner.setL[1]}`)
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