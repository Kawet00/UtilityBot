const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "remind",
    description: "remind",
    aliases: ["rm"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let duration = args[0].slice(0, -1);
        if (!duration) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[0]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() => {
                    message.delete();
                }, 300)
            })
        }

        if (isNaN(duration)) {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[1]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        }

        var filteredMessage = args.slice(1).join(" ") || lang.commands.util.Rm[9];

        function reminder() {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[2]}`)
                        .addFields({name: lang.commands.util.Rm[3], value: `${filteredMessage}`})
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            });
        }

        if (args[0].slice(2) === 's' || args[0].slice(1) === 's') {
            var msDelay = args[0].slice(0, -1) * 1000;
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} ${lang.commands.util.Rm[5]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(reminder, msDelay)
            })
        }

        if (args[0].slice(2) === 'm' || args[0].slice(1) === 'm') {
            var msDelay = args[0].slice(0, -1) * 60000;
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} minutes.`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(reminder, msDelay)
            })
        }

        if (args[0].slice(2) === 'h' || args[0].slice(1) === 'h') {
            var msDelay = args[0].slice(0, -1) * 3600000;
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)} ${lang.commands.util.Rm[6]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(reminder, msDelay)
            })
        }

        if (args[0].slice(2) === 'd' || args[0].slice(1) === 'd') {
            var msDelay = args[0].slice(0, -1) * 86400000;
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.autre.cool_pika} ┇ ${lang.commands.util.Rm[4]} ${args[0].slice(0, -1)}${lang.commands.util.Rm[7]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }).then(() => {
                setTimeout(reminder, msDelay)
            })
        }

        if (args[0].slice(2) === 'd' || args[0].slice(1) === 'd' || args[0].slice(2) === 'h' || args[0].slice(1) === 'h' || args[0].slice(2) === 'm' || args[0].slice(1) === 'm' || args[0].slice(2) === 's' || args[0].slice(1) === 's') {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.Rm[8]}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            })
        }
    }
}
