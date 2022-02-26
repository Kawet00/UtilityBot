const db = require('quick.db')
module.exports = {
    name: 'report',
    aliase: ["bug"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    cooldown: 100000,
    
    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        const row = new container.Discord.MessageActionRow().addComponents(
            new container.Discord.MessageSelectMenu()
					.setCustomId('Report')
					.setPlaceholder(lang.commands.util.report[0])
					.addOptions([
                        {
                            label: lang.commands.util.report[2],
                            description: lang.commands.util.report[5],
							value: 'bug',
                        },
                        {
                            label: lang.commands.util.report[3],
                            description: lang.commands.util.report[6],
                            value: 'ping'
                        },
                        {
                            label: lang.commands.util.report[4],
                            description: lang.commands.util.report[7],
                            value: 'other'
                        }
                    ]),
        );
                    message.reply({
                            embeds: [
                                new container.Discord.MessageEmbed()
                                .setDescription(`${lang.commands.util.report[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            ],
                        components: [row],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                }
            }