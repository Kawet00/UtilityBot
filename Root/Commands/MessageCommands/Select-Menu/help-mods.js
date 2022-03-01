const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: `help-mods`,
        aliases: [`h-m`],
        onlyUsers: ["509765051435974692", "691644619758370846"],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                var prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                        .setFooter({
                                text: `© ${client.user.username}`,
                                iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()

                const row = new container.Discord.MessageActionRow().addComponents(
                        new container.Discord.MessageSelectMenu()
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
                                },/*
                                {
                                        label: 'DELETE WARNS',
                                        description: lang.commands.help.helpDW[0].replace('{PREFIX}', prefix),
                                        value: 'HelpDeleteWarns'
                                },*/
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