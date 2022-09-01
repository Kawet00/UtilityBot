const db = require('quick.db')
module.exports = {
    name: 'set-lang',
    aliase: ["s-la"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,
    
    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
        try {

        const row = new container.Discord.MessageActionRow().addComponents(
            new container.Discord.MessageSelectMenu()
					.setCustomId('Set lang')
					.setPlaceholder(lang.commands.owner.setL[0])
					.addOptions([
                        {
                            label: lang.commands.owner.setL[2],
                            description: lang.commands.owner.setL[4],
							value: 'en',
                        },
                        {
                            label: lang.commands.owner.setL[3],
                            description: lang.commands.owner.setL[5],
                            value: 'fr'
                        }
                    ]),
        );
                    message.reply({
                            embeds: [
                                new container.Discord.MessageEmbed()
                                .setDescription(`${lang.commands.owner.setL[1]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            ],
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
                            .addField('Nom de la commande', 'Set Lang')
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
            }