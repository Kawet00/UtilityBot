const { createTranscript } = require('discord-html-transcripts')
const { GuildTicket } = require('../../UtilityBotFinal/Root/Storage/db/Models')

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, container) => {
      if(!interaction.isButton()) return;

      const { guild, customId, channel, member } = interaction;
      
      let lang = client.langs.get(db.get(`lang_${guild.id}`) || 'en')

      if(!["TicketClose", "TicketLock", "TicketUnLock", "TicketClaim", "TicketUnClaim"].includes(customId)) return;

      await GuildTicket.findOne({ GuildId: guild.id }, async (err, docs) => {
        if(err) throw err;
      if(!docs) return interaction.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(lang.event.TicketOpt[0])
          .setColor(container.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      if(!member.roles.cache.find((r) => r.id == TicketSetup.Handlers[0] || TicketSetup.Handlers[1] || TicketSetup.Handlers[2]) || member.id !== guild.ownerId || !member.permissions.has('ADMINISTRATOR')) return interaction.reply({
        ephemeral: true,
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(lang.event.TicketOpt[1])
          .setColor(container.Colors.RED)
          .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTimestamp()
        ]
      })

      const embed = new container.Discord.MessageEmbed()
      .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setTimestamp()

        switch(customId) {
          case "TicketLock": 
          if(docs.Locked == true) return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setDescription(lang.event.TicketOpt[2])
              .setColor(container.Colors.EPINGLE)
              .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
            ]
        });
        await GuildTicket.updateOne({ ChannelID: channel.id }, { Locked: true })
        embed.setDescription(`🔒 ${lang.event.TicketOpt[3]}`)
        embed.setColor(container.Colors.VERT)

          channel.permissionOverwrites.edit(docs.MemberID, {
            SEND_MESSAGES: false
          });

          channel.setName(`locked-ticket-${USERNAME}`)

        interaction.reply({
          embeds: [embed]
        })
        break;

        case "TicketUnLock":
          if(docs.Locked == false) return interaction.reply({
            content: `${lang.event.TicketOpt[4]}`,
            ephemeral: true
        });
        await GuildTicket.updateOne({ ChannelID: channel.id }, { Locked: false })
        embed.setDescription(`🔓 ${lang.event.TicketOpt[5]}`)

          channel.permissionOverwrites.edit(docs.MemberID, {
            SEND_MESSAGES: true
          });

          channel.setName(`ticket-${USERNAME}`)

        interaction.reply({
          embeds: [embed]
        })
        break;

        case "TicketClose":
          if(docs.Closed == true)
          return interaction.reply({
            content: `${lang.event.TicketOpt[6]}`,
            ephemeral: true
          })

          const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${guild.name}-${docs.Type}.html`
          })

          await GuildTicket.updateOne({ ChannelID: channel.id }, { Closed: true })
          const Message = guild.channels.cache
          .get(TRANSCRIPTID)
          .send({
            embeds: [
              embed.setTimestamp().setFooter({
                text: `© ${client.user.username}`,
                iconURL: client.user.displayAvatarURL()
              }).setTitle(`${lang.event.TicketOpt[7].replace('{TYPE}', DBTYPE).replace('{AUTHOR}', member).replace('{ID}', DBTICKETID)}`)
            ],
            files: [attachment]
          })

          interaction.reply({
            embeds: [
              embed.setDescription(`${lang.event.TicketOpt[8].replace('{MSGURL}', Message.url)}`)
            ]
          })

          setTimeout(() => {
            channel.delete()
            GuildTicket.deleteOne({ ChannelID: channel.id })
          }, 10*1000)
          break;

          case "TicketClaim":
          if(docs.Claimed == true)
          return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setColor(container.Colors.PERSO)
              .setDescription(`${lang.event.TicketOpt[9].replace('{BY}', docs.ClaimedBy)}`)
              .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
            ],
            ephemeral: true
          })
          
          channel.permissionOverwrites.edit(docs.MemberID, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: null
          });

          channel.setName(`claimed-ticket-${USERNAME}`)

          await GuildTicket.updateMany({ ChannelID: channel.id }, { Claimed: true, ClaimedBy: member.id })

          embed.setDescription(`${lang.event.TicketOpt[10].replace('{MEMBER}', member)}`)

          interaction.reply({
            embeds: [embed]
          })
          break;

          case "TicketUnClaim":
          if(docs.Claimed == false)
          return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setColor(container.Colors.PERSO)
              .setDescription(`${lang.event.TicketOpt[11]}`)
            ],
            ephemeral: true
          })
          
            channel.permissionOverwrites.edit(docs.MemberID, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: null
            });
  
            channel.setName(`ticket-${USERNAME}`)

            await GuildTicket.updateMany({ ChannelID: channel.id }, { Claimed: false, ClaimedBy: '' })

          embed.setDescription(`${lang.event.TicketOpt[12].replace('{MSGURL}', Message.url)}`)

          interaction.reply({
            embeds: [embed]
          })
          break;
        }
      })
      }
    }