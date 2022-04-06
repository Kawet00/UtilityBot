const db = require('quick.db')

module.exports = {
	name: "ticketoptions",
	description: "ticket options",
  userPermissions: ['MANAGE_MESSAGES'],
  options: [
      {
        name: "action",
        type: "STRING",
        description: "Add or remove a member from this ticket.",
        required: true,
        choices: [
          { name: "Add", value: "add", description: "Add" },
          { name: "Remove", value: "remove", description: "Remove" }
        ]
      },
      {
          name: "member",
          description: "Select a member",
          type: "USER",
          required: true,
      }
  ],

	run: async(client, interaction, container) => {
        const { guildId, options, channel, user } = interaction;
        const lang = client.langs.get(db.get(`lang_${guildId}`) || 'en')

        const Action = options.getString("action");
        const Member = options.getUser("member");

        const embed = new container.Discord.MessageEmbed()

        const DBMEMBERSID = db.get(`ticket.${guildId}.${user.id}.MembersID`)

        switch(Action) {
            case "add":
                if(!db.get(`ticket.${guildId}`) == guildId && !db.get(`ticket.${guildId}.ChannelID`) == channel.id) return interaction.reply({
                    embeds: [
                        embed.setColor('RED').setDescription(lang.slashCommands.ticketOpt[0])
                    ]
                })
                if(DBMEMBERSID.includes(Member.id)) return interaction.reply({
                    embeds: [
                        embed.setColor('RED').setDescription(lang.slashCommands.ticketOpt[1])
                    ],
                    ephemeral: true
                })
                db.push(`ticket.${guildId}.${user.id}.MembersID`, Member.id)

                channel.permissionOverwrites.edit(Member.id, {
                    SEND_MESSAGES: true,
                    VIEW_CHANNEL: true,
                    READ_MESSAGE_HISTORY: true
                })

                interaction.reply({
                    embeds: [
                        embed.setColor('GREEN').setDescription(lang.slashCommands.ticketOpt[2].replace('{MEMBER}', Member))
                    ]
                })
                break;
                
                case "remove":
                    if(!db.get(`ticket.${guildId}`) == guildId && !db.get(`ticket.${guildId}.ChannelID`) == channel.id ) return interaction.reply({
                        embeds: [
                            embed.setColor('RED').setDescription(lang.slashCommands.ticketOpt[3])
                        ]
                    })
                    if(!DBMEMBERSID.includes(Member.id)) return interaction.reply({
                        embeds: [
                            embed.setColor('RED').setDescription(lang.slashCommands.ticketOpt[4])
                        ],
                        ephemeral: true
                    })
                    db.set(`ticket.${guildId}.${user.id}.MembersID`, [DBMEMBERSID[0]])
    
                    channel.permissionOverwrites.edit(Member.id, {
                        VIEW_CHANNEL: false
                    })
    
                    interaction.reply({
                        embeds: [
                            embed.setColor('GREEN').setDescription(lang.slashCommands.ticketOpt[5].replace('{MEMBER}', Member))
                        ]
                    })
                    break;
        }
    }
}