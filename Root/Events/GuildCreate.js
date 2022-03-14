const colors = require('../Storage/json/colors.json');
const db = require('quick.db')
const Discord = require('discord.js')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
    name: "guildCreate",

    run: async (guild, client) => {

        db.set(`lang_${guild.id}`, "en")
        let lang = client.langs.get(db.get(`lang_${guild.id}`))

        const embed = new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(`${emotes.blob.blob_b} ┇ ${lang.events.guildC[0]}`)
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))
            .setDescription(lang.events.guildC[1])
            .addFields({
                name: "Here the number of servers where I am currently",
                value: `\`${client.guilds.cache.size.toString()}\` servers`,
                inline: true
            }, {
                name: "Here is the support server",
                value: `[🕵️‍♀️Support Server](https://discord.gg/R39FrwyZ7w)`,
                inline: true
            }, {
                name: "Here my Website",
                value: `[💻Website](https://www.utilitybot.ga/) `,
                inline: true
            }, {
                name: "Here you can support me",
                value: `[💲Support Me](https://donatebot.io/checkout/759700194820096011)`,
                inline: true
            }, {
                name: "My Partnership",
                value: "[Nepust](https://nepust.fr)",
                inline: true
            }, {
                name: "Prefix + Help command",
                value: "\`u!help\`"
            })
            .setFooter({
                text: `© ${client.user.username}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp()
            if(guild.systemChannel) {
        guild.systemChannel.send({
            embeds: [embed]
        })
    } else {
        await guild.fetchOwner().then(o => {
            o.send({
            embeds: [embed]
        })
    })
    }
    }
}