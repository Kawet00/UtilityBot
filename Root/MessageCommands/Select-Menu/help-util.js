const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help-util`,
    aliases: [`h-u`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

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
                    label: 'AVATAR',
                    description: lang.commands.help.helpB[0].replace('{PREFIX}', prefix),
                    value: 'HelpAvatar'
                },
                    {
                        label: 'CALCUL',
                        description: lang.commands.help.helpBi[0].replace('{PREFIX}', prefix),
                        value: 'HelpCalcul'
                    },
                    {
                        label: 'REPORT',
                        description: lang.commands.help.helpR[0].replace('{PREFIX}', prefix),
                        value: 'HelprEPORT'
                    },
                    {
                        label: lang.commands.help.util[3],
                        description: lang.commands.help.helpSwe[0].replace('{PREFIX}', prefix),
                        value: 'HelpWebSite'
                    },
                    {
                        label: 'SUPPORT',
                        description: lang.commands.help.helpSu[0].replace('{PREFIX}', prefix),
                        value: 'HelpSupport'
                    },
                    {
                        label: 'Temp',
                        description: lang.commands.help.helpT[0].replace('{PREFIX}', prefix),
                        value: 'HelpTemp'
                    },
                    {
                        label: 'VOTE',
                        description: lang.commands.help.helpV[0].replace('{PREFIX}', prefix),
                        value: 'HelpVote'
                    },
                    {
                        label: 'REMIND',
                        description: lang.commands.help.helpRm[0].replace('{PREFIX}', prefix),
                        value: 'HelpRemind'
                    },
                    {
                        label: 'APOD',
                        description: lang.commands.help.helpApod[0].replace('{PREFIX}', prefix),
                        value: 'HelpApod'
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