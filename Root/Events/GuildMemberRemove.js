const Discord = require('discord.js')
const db = require('quick.db')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
  name: "guildMemberRemove",

  run: async (member, client) => {

    let chx = db.get(`leave_${member.guild.id}`);

    if (chx === null || chx === '') {
      return;
    }

    let lang = client.langs.get(db.get(`lang_${member.guild.id}`) || 'en')

    if(db.get(`leaveMsg_${member.guild.id}`)) {
    client.channels.cache.get(chx).send({
        embeds: [
            new Discord.MessageEmbed()
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
        .setDescription(db.get(`leaveMsg_${member.guild.id}`))
        .setTitle(`${lang.events.guildMR[0]} !`)
        .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
        })
        ]
    }).then(msg => {
        msg.react(emotes.blob.blob_s)
    })
} else {
client.channels.cache.get(chx).send({
    embeds: [
        new Discord.MessageEmbed()
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
    .setDescription(`${emotes.blob.blob_s} ┇ **${member.user}** ${lang.events.guildMR[1]} **${member.guild.name}** !`)
    .setTitle(`${lang.events.guildMR[0]} !`)
    .setFooter({
        text: `© ${client.user.username}`,
        iconURL: client.user.displayAvatarURL()
    })
    ]
}).then(msg => {
    msg.react(emotes.blob.blob_s)
})
}
  }
}