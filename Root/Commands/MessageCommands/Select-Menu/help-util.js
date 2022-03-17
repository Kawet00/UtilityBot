const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help-util`,
        aliases: [`h-u`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

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
                                        label: 'AVATAR',
                                        description: lang.commands.help.helpB[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpAvatar'
                                },
                                {
                                        label: 'CALCUL',
                                        description: lang.commands.help.helpBi[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpCalcul'
                                },
                                {
                                        label: 'REPORT',
                                        description: lang.commands.help.helpR[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelprEPORT'
                                },
                                {
                                        label: lang.commands.help.util[3],
                                        description: lang.commands.help.helpSwe[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpWebSite'
                                },
                                {
                                        label: 'SUPPORT',
                                        description: lang.commands.help.helpSu[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSupport'
                                },
                                {
                                        label: 'Temp',
                                        description: lang.commands.help.helpT[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpTemp'
                                },
                                {
                                        label: 'VOTE',
                                        description: lang.commands.help.helpV[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpVote'
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