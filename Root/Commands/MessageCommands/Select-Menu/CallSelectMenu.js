module.exports = {
    name: "call",
    run: async(client, message, args, container) => {
        const row = new container.Discord.MessageActionRow().addComponents(
            new container.Discord.MessageSelectMenu()
					.setCustomId('test')
					.setPlaceholder('Open me ;)')
					.addOptions([
                        {
                            label: 'English',
							description: 'Test Command.',
							value: 'fr',
                        },
                        {
                            label: 'French',
                            description: 'Example Command',
                            value: 'en'
                        }
                    ]),
        );
                    message.reply({
                        content: "T",
                        components: [row],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
                }
            }