const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

function dateFormat(date) {
    return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
    })
}

module.exports = {
    name: 'unmute',
    aliases: ["um"],
    AllUserPermissions: ["MuteMembers"],

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[4]}`)
            ]
        })

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[0]}`)
            ]
        })

        if (!member.manageable) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[1]}`)
            ]
        })

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.unmute[2]}`)
            ]
        })

        await member.roles.remove(muteRole).then(async () => {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${member} ${lang.commands.mods.unmute[5]}`)
                ]
            })

            let logsC = await getLogsChannel(message.guild.id)
            if (logsC === null) return;
            else
                message.guild.channels.cache.get(logsC).send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.unmute[3]}`)
                            .setColor(colors.EPINGLE)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .addFields(
                                {name: lang.commands.mods.unmute[4], value: member.author.tag, inline: true},
                                {name: lang.commands.modsa[0], value: `<@!${message.author.id}>`, inline: true},
                                {name: `\u200B`, value: '\u200B'},
                                {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``},
                            )
                    ]
                });
        })
        setTimeout(() => {
            message.delete();
        }, 300)
    }
}