const weather = require("weather-js");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "temp",
    aliases: ["t", "weather"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let degree;
        if (args[0]) {
            if (args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f") {
                degree = args[0].toUpperCase();
            } else {
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.EPINGLE)
                            .setDescription(`${cemotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[0]}`)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                });
            }
        } else {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[1]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            });
        }

        let ville = args.splice(1).join(" ")
        if (!ville) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[2]}`)
            ]
        });

        weather.find({search: ville, degreeType: degree}, function (err, result) {
            try {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.PERSO)
                            .setTitle(lang.commands.util.temp[3])
                            .setThumbnail(result[0].current.imageUrl)
                            .setDescription(`${lang.commands.util.temp[4]} ${result[0].location.name}`)
                            .addFields(
                                {
                                    name: `🥶 ┇ **${lang.commands.util.temp[5]}**`,
                                    value: `${result[0].current.temperature}°${result[0].location.degreetype}`,
                                    inline: true
                                },
                                {name: "**Temp:**", value: `${result[0].current.skytext}`, inline: true},
                                {
                                    name: `**${lang.commands.util.temp[6]}**`,
                                    value: `${result[0].current.shortday}`,
                                    inline: true
                                },
                                {
                                    name: `**${lang.commands.util.temp[7]}**`,
                                    value: `${result[0].current.feelslike}°${result[0].location.degreetype}`,
                                    inline: true
                                },
                                {
                                    name: `💦 ┇ **${lang.commands.util.temp[8]}**`,
                                    value: `${result[0].current.humidity}%`,
                                    inline: true
                                },
                                {
                                    name: `💨 ┇ **${lang.commands.util.temp[9]}**`,
                                    value: `${result[0].current.winddisplay}`,
                                    inline: true
                                }
                            )
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    ]
                });
            } catch (err) {
                console.log(err);

                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.RED)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.util.temp[10]}`)
                    ]
                });
            }
        });
    },
};