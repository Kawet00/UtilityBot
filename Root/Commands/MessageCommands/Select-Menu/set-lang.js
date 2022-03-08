const db = require('quick.db')
module.exports = {
    name: 'set-lang',
    aliase: ["s-la"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,
    
    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

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
                                .setDescription(`${lang.commands.owner.setL[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            ],
                        components: [row],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                }
            }