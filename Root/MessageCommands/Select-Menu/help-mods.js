const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help-mods`,
    aliases: [`h-m`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')
        let prefix = await getPrefix(message.guild.id)

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
                    label: 'TIMEOUT',
                    description: lang.commands.help.helpTi[0].replace('{PREFIX}', prefix),
                    value: 'HelpTimeout'
                },
                    {
                        label: 'BAN',
                        description: lang.commands.help.helpBa[0].replace('{PREFIX}', prefix),
                        value: 'HelpBan'
                    },
                    {
                        label: 'DELETE WARNS',
                        description: lang.commands.help.helpDW[0].replace('{PREFIX}', prefix),
                        value: 'HelpDeleteWarns'
                    },
                    {
                        label: 'KICK',
                        description: lang.commands.help.helpK[0].replace('{PREFIX}', prefix),
                        value: 'HelpKick'
                    },
                    {
                        label: 'MUTE',
                        description: lang.commands.help.helpMu[0].replace('{PREFIX}', prefix),
                        value: 'HelpMute'
                    },
                    {
                        label: 'UNMUTE',
                        description: lang.commands.help.helpUm[0].replace('{PREFIX}', prefix),
                        value: 'HelpUnMute'
                    },
                    {
                        label: 'REROLL GIVEAWAYS',
                        description: lang.commands.help.helpRg[0].replace('{PREFIX}', prefix),
                        value: 'HelpRerollG'
                    },
                    {
                        label: 'SET BYE',
                        description: lang.commands.help.helpSetB[0].replace('{PREFIX}', prefix),
                        value: 'HelpSetBye'
                    },
                    {
                        label: 'SET LANG',
                        description: lang.commands.help.helpSLa[0].replace('{PREFIX}', prefix),
                        value: 'HelpSetLang'
                    },
                    {
                        label: 'SET LOGS',
                        description: lang.commands.help.helpSl[0].replace('{PREFIX}', prefix),
                        value: 'HelpSetLogs'
                    },
                    {
                        label: 'SET PREFIX',
                        description: lang.commands.help.helpSp[0].replace('{PREFIX}', prefix),
                        value: 'HelpSetPrefix',
                    },
                    {
                        label: 'SET WELCOME',
                        description: lang.commands.help.helpSw[0].replace('{PREFIX}', prefix),
                        value: 'HelpSetWelcome'
                    },
                    {
                        label: lang.commands.help.util[1],
                        description: lang.commands.help.helpSs[0].replace('{PREFIX}', prefix),
                        value: 'HelpPoll'
                    },
                    {
                        label: 'START GIVEAWAYS',
                        description: lang.commands.help.helpSg[0].replace('{PREFIX}', prefix),
                        value: 'HelpStartG'
                    },
                    {
                        label: 'TOTAL WARNS',
                        description: lang.commands.help.helpTw[0].replace('{PREFIX}', prefix),
                        value: 'HelpSlap'
                    },
                    {
                        label: 'WARN',
                        description: lang.commands.help.helpW[0].replace('{PREFIX}', prefix),
                        value: 'HelpWarn'
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