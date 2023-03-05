const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help-info`,
    aliases: [`h-i`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')
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
                    label: 'BOTINFO',
                    description: lang.commands.help.helpBo[0].replace('{PREFIX}', prefix),
                    value: 'HelpBotInfo'
                },
                    {
                        label: 'INVITE',
                        description: lang.commands.help.helpI[0].replace('{PREFIX}', prefix),
                        value: 'HelpInvite'
                    },
                    {
                        label: 'PING',
                        description: lang.commands.help.helpCat[0].replace('{PREFIX}', prefix),
                        value: 'HelpPing'
                    },
                    {
                        label: lang.commands.help.info[1],
                        description: lang.commands.help.helpSS[0].replace('{PREFIX}', prefix),
                        value: 'HelpServerStats'
                    },
                    {
                        label: 'UPTIME',
                        description: lang.commands.help.helpUp[0].replace('{PREFIX}', prefix),
                        value: 'HelpUptime'
                    },
                    {
                        label: 'USERINFO',
                        description: lang.commands.help.helpUI[0].replace('{PREFIX}', prefix),
                        value: 'HelpUserInfo'
                    },
                    {
                        label: 'GITHUB',
                        description: lang.commands.help.helpGit[0].replace('{PREFIX}', prefix),
                        value: 'HelGithub'
                    },
                    {
                        label: 'SEARCH GITHUB',
                        description: lang.commands.help.helpSGit[0].replace('{PREFIX}', prefix),
                        value: 'HelpSearchGithub'
                    },
                    {
                        label: 'CRYPTO PRICE',
                        description: lang.commands.help.helpUI[0].replace('{PREFIX}', prefix),
                        value: 'HelpCrypto'
                    },
                    {
                        label: 'PEOPLE IN SPACE',
                        description: lang.commands.help.helpPIS[0].replace('{PREFIX}', prefix),
                        value: 'HelpPis'
                    },
                    {
                        label: 'YOUTUBE STATS',
                        description: lang.commands.help.helpPIS[0].replace('{PREFIX}', prefix),
                        value: 'helpYTSTATS'
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