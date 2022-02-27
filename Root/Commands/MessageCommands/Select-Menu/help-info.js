const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: `help-info`,
        aliases: [`h-info`],
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