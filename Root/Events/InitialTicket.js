const db = require('quick.db')

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, container) => {
      if(!interaction.isButton()) return;

      const { guild, member, customId } = interaction;

      const Data = db.get(`ticket.${guild.id}`);
      if(!Data) return;

      if(!Data.Button.includes(customId)) return;

      const ID = Math.floor(Math.random() * 9000) + 1000

      console.log()

      const filtered = db.get(`ticket.${guild.id}.Handlers`).map(async (num, index) => {
        if(index < 3) {
          return num;
        }
      })

      const TRANSCRIPTID = db.get(`ticket.${guild.id}.Transcripts`)
      if(TRANSCRIPTID) {
          if(!filtered[2]) {
          await guild.channels.create(`${customId + "-" + member.user.username}`, {
            type: "GUILD_TEXT",
            parent: Data.CategoryID,
            permissionOverwrites: [
              {
                id: member.id,
                allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
              },
              {
                id: db.get(`ticket.${guild.id}.Handlers`)[0],
                allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
              },
              {
                id: db.get(`ticket.${guild.id}.Handlers`)[1],
                allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
              },
              {
                id: guild.id,
                deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
              }
            ]
          }).then(async(channel) => {
            db.set(`ticket.${guild.id}.${member.id}`, {
              MembersID: [member.id],
              ChannelID: channel.id,
              TicketID: ID,
              Closed: false,
              Locked: false,
              Claimed: false,
              ClaimedBy: false,
              Type: customId
            })
        })
      }
      else if(!filtered[1]) {
        await guild.channels.create(`${customId + "-" + member.user.username}`, {
          type: "GUILD_TEXT",
          parent: Data.CategoryID,
          permissionOverwrites: [
            {
              id: member.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
              id: db.get(`ticket.${guild.id}.Handlers`)[0],
              allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
            },
            {
              id: guild.id,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            }
          ]
        }).then(async(channel) => {
          db.set(`ticket.${guild.id}.${member.id}`, {
            MembersID: [member.id],
            ChannelID: channel.id,
            TicketID: ID,
            Closed: false,
            Locked: false,
            Claimed: false,
            ClaimedBy: false,
            Type: customId
          })
      })
      }
      else {
        await guild.channels.create(`${customId + "-" + member.user.username}`, {
          type: "GUILD_TEXT",
          parent: Data.CategoryID,
          permissionOverwrites: [
            {
              id: member.id,
              allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            },
            {
              id: db.get(`ticket.${guild.id}.Handlers`)[0],
              allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
            },
            {
              id: db.get(`ticket.${guild.id}.Handlers`)[1],
              allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
            },
            {
              id: db.get(`ticket.${guild.id}.Handlers`)[2],
              allow: ['VIEW_CHANNEL', "MANAGE_MESSAGES", "SEND_MESSAGES"]
            },
            {
              id: guild.id,
              deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
            }
          ]
        }).then(async(channel) => {
          db.set(`ticket.${guild.id}.${member.id}`, {
            MembersID: [member.id],
            ChannelID: channel.id,
            TicketID: ID,
            Closed: false,
            Locked: false,
            Claimed: false,
            ClaimedBy: false,
            Type: customId
          })
      })
      }
      
      const DBTYPE = db.get(`ticket.${guild.id}.${member.id}.Type`)
        
      const embed = new container.Discord.MessageEmbed()
      .setAuthor({
        name: `Ticket`,
        iconURL: guild.iconURL({ dynamic: true })
      })
      .addField('Type', DBTYPE)
      .setDescription('Please wait.')
      .setColor(container.Colors.PERSO)
      .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
      .setTimestamp()

      const buttons = new container.Discord.MessageActionRow()
      buttons.addComponents(
        new container.Discord.MessageButton()
        .setCustomId('TicketClose')
        .setLabel('Save & Close Ticket')
        .setStyle('PRIMARY')
        .setEmoji('💾'),
  
        new container.Discord.MessageButton()
        .setCustomId('TicketLock')
        .setLabel('Lock Ticket')
        .setStyle('SECONDARY')
        .setEmoji('🔒'),
  
        new container.Discord.MessageButton()
        .setCustomId('TicketUnLock')
        .setLabel('Unlock Ticket')
        .setStyle('SUCCESS')
        .setEmoji('🔓'),
  
        new container.Discord.MessageButton()
        .setCustomId('TicketClaim')
        .setLabel('Claim Ticket')
        .setStyle('SECONDARY')
        .setEmoji('🛄'),

        new container.Discord.MessageButton()
        .setCustomId('TicketUnClaim')
        .setLabel('Unclaim Ticket')
        .setStyle('SUCCESS')
    )

      guild.channels.cache
      .get(db.get(`ticket.${guild.id}.${member.id}.ChannelID`))
      .send({
        embeds: [embed],
        components: [buttons]
      })

      guild.channels.cache
      .get(db.get(`ticket.${guild.id}.${member.id}.ChannelID`))
      .send({
        content: `${member} here is your ticket.`,
      }).then((m) => {
        setTimeout(() => {
          m.delete().catch(() => {})
        }, 1*5000)
      })

      interaction.reply({
        content: `${member} your ticket has been created: <#${db.get(`ticket.${guild.id}.${member.id}.ChannelID`)}>`,
        ephemeral: true
      })
 } else {
    interaction.reply({
      content: "Please setup the channel of transcript with the commande `u!setup-transcript <mention the channel>`",
      ephemeral: true
    })
  }
}
}