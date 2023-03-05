const {getLang, getLogsChannel, updateWarns, getWarns} = require('../../Storage/db/manager');
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
    name: "warn",
    description: "Warn a member",
    AllUserPermissions: ["ManageMessages"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);

        if (!user) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (user.bot) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[1]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        if (message.author.id === user.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[2]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setColor(colors.RED)
            ]
        }).then(msg => {
            msg.delete({
                timeout: 10000
            })
        });

        if (message.guild.ownerID === user.id) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[3]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        let reason = args.slice(2).join(" ") || lang.commands.modsa[2];

        let warnings = await getWarns(message.guild.id, user.id);

        if (warnings === null) {
            await updateWarns(message.guild.id, user.id, 'add');
            user.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[4]}`)
                        .addFields({
                            name: lang.commands.modsa[6],
                            value: message.guild.name,
                            inline: true
                        }, {
                            name: lang.commands.modsa[1],
                            value: reason,
                            inline: true
                        })
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .setColor(colors.EPINGLE)
                ]
            })
            await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setDescription(`${emotes.pepe.pepe_w} ┇ **${user.username}** ${lang.commands.mods.warn[5]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        }

        if (warnings !== null) {
            await updateWarns(message.guild.id, user.id, 'add');
            await user.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[4]}`)
                        .addFields({
                            name: lang.commands.modsa[6],
                            value: message.guild.name,
                            inline: true
                        }, {
                            name: lang.commands.modsa[1],
                            value: reason,
                            inline: true
                        })
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .setColor(colors.EPINGLE)
                ]
            })
            await message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_w} ┇ **${user.username}** ${lang.commands.mods.warn[5]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        }

        const logsC = await getLogsChannel(message.guild.id);
        if (logsC === null) {
            return;
        }
        else message.guild.channels.cache.get(logsC).send({
            embeds: [
                new EmbedBuilder()
                    .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[6]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .addFields(
                        {
                            name: lang.commands.mods.warn[7],
                            value: user.username + '#' + user.discriminator,
                            inline: true
                        },
                        {
                            name: lang.commands.modsa[0],
                            value: message.author.username + '#' + message.author.discriminator,
                            inline: true
                        },
                        {name: lang.commands.mods.warn[8], value: `${warnings}`, inline: true},
                        {name: `\u200B`, value: '\u200B'},
                        {name: lang.commands.modsa[1], value: reason},
                        {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                    )
            ]
        });
        setTimeout(() => {
            message.delete();
        }, 300)
    }
}