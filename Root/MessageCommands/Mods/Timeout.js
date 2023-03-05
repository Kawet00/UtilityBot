const ms = require('ms')
const fetch = require('node-fetch')
const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {token} = require('../../Storage/json/Config.json');


module.exports = {
    name: "timeout",
    description: "Set a timeout for a member",
    AllUserPermissions: ['ManageMessages'],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const time = args[0]
        const user = message.mentions.members.first()
        if (!user) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.red_dark)
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.mods.timeout[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        const reason = args.slice(2).join(" ") || lang.commands.mods["noR"]
        const member = message.guild.members.cache.get(user.id)

        const milliseconds = ms(time);
        const iosTime = new Date(Date.now() + milliseconds).toISOString();

        if (user.id === client.user.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[3]}`)
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (user.id === message.member.is) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[4]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[5]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (!milliseconds || milliseconds < 30000 || milliseconds > 2419200000) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.green_light)
                        .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[0]
                            .replace('{30000}', ms(30000))
                            .replace('{2419200000}', ms(2419200000))}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }


        try {
            await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({communication_disabled_until: iosTime, reason: reason}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${token}`,
                },
            });

            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.green_light)
                        .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[1].replace('{USER}', user).replace('{TIME}', time)}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(async () => {
                const logsC = await getLogsChannel(message.guild.id)
                if (logsC === null) return;
                else message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.timeout[2]}`)
                            .setColor(colors.EPINGLE)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .addFields(
                                {
                                    name: lang.commands.mods.timeout[3],
                                    value: member.user.username + '#' + member.user.discriminator,
                                    inline: true
                                },
                                {
                                    name: lang.commands.modsa[0],
                                    value: message.author.username + '#' + message.author.discriminator,
                                    inline: true
                                },
                                {name: `\u200B`, value: '\u200B'},
                                {name: lang.commands.mods.timeout[4], value: ms[milliseconds]},
                                {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``},
                            )
                    ]
                })
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        } catch (e) {
            console.log(e)
        }
    }
}