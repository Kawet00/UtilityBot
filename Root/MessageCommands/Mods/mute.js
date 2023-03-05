const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder,PermissionsBitField} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

function dateFormat(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
    })
}

module.exports = {
    aliases: ["m"],
    description: 'none',
    AllUserPermissions: ["MuteMembers"],
    name: 'mute',

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
        if (member.roles.cache.has(muteRole)) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.RED)
                        .setDescription(`${lang.commands.mods.mute[6]}`)
                        .setTimestamp()
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                ]
            })
            console.log('s')
        }
        if (member.id === message.guild.ownerID) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.mute[1]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
        if (member.id === message.member.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.mute[1]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.mute[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (!member.manageable) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.mute[3]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        const reason = args.slice(2).join(' ') || lang.commands.modsa[1]

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                name: 'Muted',
                permissions: []
            });
            message.guild.channels.cache.forEach(channel => channel.permissionOverwrites.edit(muteRole.id, {
                ADD_REACTIONS: false,
                CONNECT: false,
                SEND_MESSAGES: false
            }));
        }


        await member.roles.add(muteRole).then(() => {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.mute} ┇ ${member} ${lang.commands.mods.mute[6]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        })
        setTimeout(() => {
            message.delete();
        }, 300)
        let logsC = await getLogsChannel(message.guild.id);
        if (logsC === null) return;
        else
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[4]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .addFields(
                            {
                                name: lang.commands.mods.mute[5],
                                value: member.user.username + '#' + member.user.discriminator,
                                inline: true
                            },
                            {
                                name: lang.commands.modsa[0],
                                value: message.author.username + '#' + message.author.discriminator,
                                inline: true
                            },
                            {name: `\u200B`, value: '\u200B'},
                            {name: lang.commands.modsa[2], value: reason},
                            {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                        )
                ]
            })
    }
}