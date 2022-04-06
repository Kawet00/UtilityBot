const { createTranscript } = require('discord-html-transcripts')
const db = require('quick.db')

module.exports = {
    name: "interactionCreate",
    run: async (interaction, client, container) => {
      if(!interaction.isButton()) return;

      const { guild, customId, channel, member } = interaction;

      console.log(member)
      
      let lang = client.langs.get(db.get(`lang_${guild.id}`) || 'en')

      if(!["TicketClose", "TicketLock", "TicketUnLock", "TicketClaim", "TicketUnClaim"].includes(customId)) return;

      const TicketSetup = db.get(`ticket.${guild.id}`)
      if(!TicketSetup) return interaction.reply({
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

        const DBLOCKED = db.get(`ticket.${guild.id}.${member.id}.Locked`)
        const DBCLOSED = db.get(`ticket.${guild.id}.${member.id}.Closed`)
        const DBCLAIMED = db.get(`ticket.${guild.id}.${member.id}.Claimed`)
        const DBCLAIMEDBY = db.get(`ticket.${guild.id}.${member.id}.ClaimedBy`)
        const DBMEMBERSID = db.get(`ticket.${guild.id}.${member.id}.MembersID`)
        const DBGUILDNAME = db.get(`ticket.${guild.id}.GuildName`)
        const DBTICKETID = db.get(`ticket.${guild.id}.${member.id}.TicketID`)
        const DBTYPE = db.get(`ticket.${guild.id}.${member.id}.Type`)
        const USERNAME = client.users.cache.get(db.get(`ticket.${guild.id}.${member.id}.MembersID`)[0]).username

        switch(customId) {
          case "TicketLock": 
          if(DBLOCKED == true) return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setDescription(lang.event.TicketOpt[2])
              .setColor(container.Colors.EPINGLE)
              .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
            ]
        });
        db.set(`ticket.${guild.id}.${member.id}.Locked`, true)
        embed.setDescription(`🔒 ${lang.event.TicketOpt[3]}`)
        embed.setColor(container.Colors.VERT)

        DBMEMBERSID.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            SEND_MESSAGES: false
          });

          channel.setName(`locked-ticket-${USERNAME}`)
        })

        interaction.reply({
          embeds: [embed]
        })
        break;

        case "TicketUnLock":
          if(DBLOCKED == false) return interaction.reply({
            content: `${lang.event.TicketOpt[4]}`,
            ephemeral: true
        });
        db.set(`ticket.${guild.id}.${member.id}.Locked`, false)
        embed.setDescription(`🔓 ${lang.event.TicketOpt[5]}`)

        DBMEMBERSID.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            SEND_MESSAGES: true
          });

          channel.setName(`ticket-${USERNAME}`)
        })

        interaction.reply({
          embeds: [embed]
        })
        break;

        case "TicketClose":
          if(DBCLOSED == true)
          return interaction.reply({
            content: `${lang.event.TicketOpt[6]}`,
            ephemeral: true
          })

          const attachment = await createTranscript(channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${DBGUILDNAME}-${DBTYPE}-${DBTICKETID}`
          })

          db.set(`ticket.${guild.id}.${member.id}.Closed`, true);
          const Message = guild.channels.cache
          .get(TicketSetup.Transcripts)
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
            db.delete(`ticket.${guild.id}.${member.id}`)
          }, 10*1000)
          break;

          case "TicketClaim":
          if(DBCLAIMED == true)
          return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setColor(container.Colors.PERSO)
              .setDescription(`${lang.event.TicketOpt[9].replace('{BY}', DBCLAIMEDBY)}`)
              .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
              .setTimestamp()
            ],
            ephemeral: true
          })
          
        DBMEMBERSID.forEach((m) => {
          channel.permissionOverwrites.edit(m, {
            VIEW_CHANNEL: false,
            SEND_MESSAGES: null
          });

          channel.setName(`claimed-ticket-${USERNAME}`)
        })

          db.set(`ticket.${guild.id}.${member.id}.Claimed`, true)
          db.set(`ticket.${guild.id}.${member.id}.ClaimedBy`, member.id)

          embed.setDescription(`${lang.event.TicketOpt[10].replace('{MEMBER}', member)}`)

          interaction.reply({
            embeds: [embed]
          })
          break;

          case "TicketUnClaim":
          if(DBCLAIMED == false)
          return interaction.reply({
            embeds: [
              new container.Discord.MessageEmbed()
              .setColor(container.Colors.PERSO)
              .setDescription(`${lang.event.TicketOpt[11]}`)
            ],
            ephemeral: true
          })
          
          DBMEMBERSID.forEach((m) => {
            channel.permissionOverwrites.edit(m, {
              VIEW_CHANNEL: false,
              SEND_MESSAGES: null
            });
  
            channel.setName(`ticket-${USERNAME}`)
          })

          db.set(`ticket.${guild.id}.${member.id}.Claimed`, false)
          db.set(`ticket.${guild.id}.${member.id}.ClaimedBy`, false)

          embed.setDescription(`${lang.event.TicketOpt[12].replace('{MSGURL}', Message.url)}`)

          interaction.reply({
            embeds: [embed]
          })
          break;
        }
      }
    }