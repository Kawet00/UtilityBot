const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help-util`,
        aliases: [`h-u`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                try {

                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://eternode.ga/)`)
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
                                },
                                {
                                        label: 'REMIND',
                                        description: lang.commands.help.helpRm[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpRemind'
                                },
                                {
                                        label: 'APOD',
                                        description: lang.commands.help.helpApod[0].replace('{PREFIX}', container.Prefix),
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
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Help Util')
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