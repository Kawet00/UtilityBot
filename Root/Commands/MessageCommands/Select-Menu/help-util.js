const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: `help-util`,
        aliases: [`h-u`],
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
                                        label: 'AVATAR',
                                        description: lang.commands.help.helpB[0].replace('{PREFIX}', prefix),
                                        value: 'HelpAvtar'
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