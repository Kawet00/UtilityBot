const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help-mods`,
        aliases: [`h-m`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                try {

                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
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
                                        description: lang.commands.help.helpTi[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpTimeout'
                                },
                                {
                                        label: 'BAN',
                                        description: lang.commands.help.helpBa[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpBan'
                                },
                                {
                                        label: 'DELETE WARNS',
                                        description: lang.commands.help.helpDW[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpDeleteWarns'
                                },
                                {
                                        label: 'KICK',
                                        description: lang.commands.help.helpK[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpKick'
                                },
                                {
                                        label: 'MUTE',
                                        description: lang.commands.help.helpMu[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpMute'
                                },
                                {
                                        label: 'UNMUTE',
                                        description: lang.commands.help.helpUm[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpUnMute'
                                },
                                {
                                        label: 'REROLL GIVEAWAYS',
                                        description: lang.commands.help.helpRg[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpRerollG'
                                },
                                {
                                        label: 'SET BYE',
                                        description: lang.commands.help.helpSetB[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSetBye'
                                },
                                {
                                        label: 'SET LANG',
                                        description: lang.commands.help.helpSLa[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSetLang'
                                },
                                {
                                        label: 'SET LOGS',
                                        description: lang.commands.help.helpSl[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSetLogs'
                                },
                                {
                                        label: 'SET PREFIX',
                                        description: lang.commands.help.helpSp[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSetPrefix',
                                },
                                {
                                        label: 'SET WELCOME',
                                        description: lang.commands.help.helpSw[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSetWelcome'
                                },
                                {
                                        label: lang.commands.help.util[1],
                                        description: lang.commands.help.helpSs[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPoll'
                                },
                                {
                                        label: 'START GIVEAWAYS',
                                        description: lang.commands.help.helpSg[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpStartG'
                                },
                                {
                                        label: 'TOTAL WARNS',
                                        description: lang.commands.help.helpTw[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSlap'
                                },
                                {
                                        label: 'WARN',
                                        description: lang.commands.help.helpW[0].replace('{PREFIX}', container.Prefix),
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
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Help Mods')
                    .addField('Erreur', `\`\`\`${e}\`\`\``)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setColor(colors.PERSO)
                ]
            })
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${lang.commands.problem[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            })
            console.log(e)
          }
        }
};