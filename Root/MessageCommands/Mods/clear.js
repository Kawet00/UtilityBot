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
    name: "clear",
    description: "clears message",
    aliases: ['cl', 'purge'],
    AllUserPermissions: ["ManageMessages"],
    AllClientPermissions: ["ManageMessages"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })
        if (isNaN(args[0])) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[7]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
        if (args[0] < 5) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[1]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })
        if (args[0] > 99) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.clear[2]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })
        try {
            message.channel.bulkDelete(parseInt(args[0]) + parseInt(1)).then(async () => {
                message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${emotes.autre.cool_pika} ┇ \`${args[0]}\` ${lang.commands.mods.clear[3]}`)
                            .setColor(colors.VERT)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 3000)
                })
                let logsC = await getLogsChannel(message.guild.id)
                if (logsC === null) return;
                else
                    message.guild.channels.cache.get(logsC).send({
                        embeds: [
                            new EmbedBuilder()
                                .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.clear[4]}`)
                                .setColor(colors.EPINGLE)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                                .addFields(
                                    {name: lang.commands.mods.clear[5], value: args[0], inline: true},
                                    {name: lang.commands.modsa[0], value: `<@!${message.author.id}>`, inline: true},
                                    {name: lang.commands.modsa[5], value: `<#${message.channel.id}>`},
                                    {name: `\u200B`, value: '\u200B'},
                                    {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                                )
                        ]
                    });
            })
        } catch (e) {
            console.log(e)
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.RED)
                        .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.mods.clear[6]}`)
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