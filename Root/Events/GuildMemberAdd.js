const db = require('quick.db')
const Discord = require('discord.js')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
    name: "guildMemberAdd",

    run: async (member, client) => {
        let chx = db.get(`welcome_${member.guild.id}`);

        if (chx === null || chx === '') {
            return;
        }

        let lang = client.langs.get(db.get(`lang_${member.guild.id}`) || 'en')

    if(db.get(`welcomeMsg_${member.guild.id}`)) {
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
        .setDescription(db.get(`welcomeMsg_${member.guild.id}`))
        .setTitle(`${lang.events.guildMA[1]} !`)
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
    .setDescription(`${emotes.blob.blob_s} ┇ ${lang.events.guildMA[0]} **${member.user}** ${lang.events.guildMA[1]} **${member.guild.name}** !`)
    .setTitle(`${lang.events.guildMA[0]} ${member.user.username} !`)
    .setFooter({
        text: `© ${client.user.username}`,
        iconURL: client.user.displayAvatarURL()
    })
    ]
}).then(msg => {
    msg.react(emotes.blob.blob_s)
})
}

if(db.get(`welcomeRole.${member.guild.id}`)) {
    member.roles.add(db.get(`welcomeRole.${member.guild.id}`))
}
    }
    }