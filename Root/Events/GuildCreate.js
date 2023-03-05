const colors = require('../Storage/json/colors.json');
const {EmbedBuilder} = require('discord.js')
const emotes = require('../Storage/json/emotes.json')
const {createGuild} = require('../Storage/db/manager')

module.exports = {
    name: "guildCreate",

    run: async (guild, client) => {
        if (!guild.available) return;

        await createGuild(guild.id);

        const embed = new EmbedBuilder()
            .setColor(colors.PERSO)
            .setTitle(`${emotes.blob.blob_h} ┇ Hi`)
            .setThumbnail(guild.iconURL({
                dynamic: true
            }))
            .setDescription("Thank you for adding me to your server!")
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
                value: `[💻Website](https://utilitybot.me/) `,
                inline: true
            }, {
                name: "Here you can support me and get bonuses",
                value: `[💲Support Me](https://www.patreon.com/Elpistolero13)`,
                inline: true
            }, {
                name: "My Partnership",
                value: "[YorkHost](https://yorkhost.fr)",
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