const Discord = require('discord.js')
const db = require('quick.db')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
  name: "guildMemberRemove",

  run: async (member, client) => {

    let chx = db.get(`byechannel_${member.guild.id}`);

    if (chx === null) {
      return;
    }
    let lang = client.langs.get(db.get(`lang_${member.guild.id}`) || 'en')

    let wembed = new Discord.MessageEmbed()
      .setAuthor({
        name: member.user.username,
        iconURL: member.user.avatarURL({
          dynamic: true
        })
      })
      .setColor(colors.PERSO)
      .setThumbnail(member.user.avatarURL({
        dynamic: true
      }))
      .setDescription(`${emotes.blob.blob_c} ┇ **${member.user}** ${lang.events.guildMR[0]} **${member.guild.name}** !`)
      .setTitle(`${lang.events.guildMR[1]} !`)
      .setFooter({
        text: `© ${client.user.username}`,
        iconURL: client.user.avatarURL()
      })

    client.channels.cache.get(chx).send({
      embeds: [wembed]
    }).then(msg => {
      msg.react(emotes.blob.blob_c);
    })
  }
}