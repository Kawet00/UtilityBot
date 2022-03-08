const db = require('quick.db')

module.exports= {
    name: 'testembed-builder',
    aliases: ["te-b"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        let msgBE = new container.Discord.MessageEmbed()
        .setTitle(`${lang.commands.util.embed[0]}`)
        .setDescription(`${lang.commands.util.embed[1]}`)

        const row = new container.Discord.MessageActionRow().addComponents(
            new container.Discord.MessageSelectMenu()
					.setCustomId('Report')
					.setPlaceholder(lang.commands.util.report[0])
					.addOptions([
                        {
                            label: 'Title',
                            description: 'settitle',
							value: 'EmbedBuilderTitle',
                        },
                        {
                            label: 'Description',
                            description: 'setdescription',
                            value: 'EmbedBuilderDesc'
                        },
                        {
                            label: 'Image',
                            description: 'setimage',
                            value: 'EmbedBuilderImage'
                        }
                    ]),
        );
                    message.reply({
                            embeds: [msgBE],
                        components: [row],
                        allowedMentions: {
                            repliedUser: false
                        }
                    })
    }
}