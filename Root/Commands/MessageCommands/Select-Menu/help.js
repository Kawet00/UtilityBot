const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help`,
        aliases: [`h`],
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
                                        label: 'Util',
                                        description: lang.commands.helpa[20],
                                        value: 'Util',
                                },
                                {
                                        label: 'Mods',
                                        description: lang.commands.helpa[21],
                                        value: 'Mods'
                                },
                                {
                                        label: 'Info',
                                        description: lang.commands.helpa[22],
                                        value: 'Info'
                                },
                                {
                                        label: 'Fun',
                                        description: lang.commands.helpa[23],
                                        value: 'Fun'
                                },
                                {
                                        label: 'Music',
                                        description: lang.commands.helpa[23],
                                        value: 'Music'
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
                    .addField('Nom de la commande', 'Help')
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