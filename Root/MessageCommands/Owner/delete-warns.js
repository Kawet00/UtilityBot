const {getLang, getPrefix, getLogsChannel,getWarns,updateWarns} = require('../../Storage/db/manager');
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
    name: 'delete-warns',
    description: 'flm',
    aliases: ["d-w"],
    AllUserPermissions: ["Administrator"],
    cooldown: 60000,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

        const user = message.mentions.members.first();
        const number = args[1]

        if (!user) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.EPINGLE)
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (user.id == message.author.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.owner.deleteW[3]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (user.bot) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.owner.deleteW[4]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (user && message.member.roles.highest.comparePositionTo(user.roles.highest) <= 0 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.owner.deleteW[5]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ],
            ephemeral: true
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (!number) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (!Number.isNaN(+number)) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[1]}`)
                    .setColor(colors.EPINGLE)
                    .setTimestamp()
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        if (number === 'all') {
            await updateWarns(message.guild.id, user.id, 'all');
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.owner.deleteW[6].replace('{MEMBER}', user)}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setColor(colors.VERT)
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })

            let logsC = await getLogsChannel(message.guild.id)
            if (logsC === null) return;
            else message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[7]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .addFields(
                            {name: lang.commands.owner.deleteW[8], value: user, inline: true},
                            {name: lang.commands.owner.deleteW[9], value: message.author, inline: true},
                            {name: `\u200B`, value: '\u200B'},
                            {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                        )
                ]
            });
        } else {
            try {
                await updateWarns(message.guild.id, user.id, 'remove', number);
                const Wdb = await getWarns(message.guild.id, user.id);

                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${emotes.pepe.pepe_ok} ┇ ${lang.commands.owner.deleteW[10].replace('{NUMBER}', number)
                                .replace('{MEMBER}', user)}`)
                            .setColor(colors.EPINGLE)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                }).then(() => {
                    setTimeout(() => {
                        message.delete();
                    }, 300)
                })
                let logsC = getLogsChannel(message.guild.id);
                if (logsC === null) return;
                else message.guild.channels.cache.get(logsC).send({
                    embeds: [
                        new EmbedBuilder()
                            .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[11]}`)
                            .setColor(colors.EPINGLE)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .addFields(
                                {name: lang.commands.owner.deleteW[8], value: user, inline: true},
                                {name: lang.commands.owner.deleteW[9], value: message.author, inline: true},
                                {name: lang.commands.owner.deleteW[12], value: number, inline: true},
                                {name: lang.commands.owner.deleteW[13], value: Wdb},
                                {name: `\u200B`, value: '\u200B'},
                                {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                            )
                    ]
                });
            } catch (e) {
                console.log(e)
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[14].replace('{PREFIX}', prefix)}`)
                            .setColor(colors.RED)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                }).then(() => {
                    setTimeout(() => {
                        message.delete();
                    }, 300)
                })
            }
        }
    }
}