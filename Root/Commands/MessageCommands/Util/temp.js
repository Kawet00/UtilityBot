const colors = require("../../../Storage/json/colors.json")
const weather = require("weather-js");

const db = require('quick.db');

module.exports = {
    name: "temp",
    aliases: ["t", "weather"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let degree;
        if (args[0]) {
            if (args[0] === "C" || args[0] === "c" || args[0] === "F" || args[0] === "f") {
                degree = args[0].toUpperCase();
            } else {
                return message.reply({
                    embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(colors.EPINGLE)
                    .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    ]
                });
            }
        } else {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[1]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            });
        }

        let ville = args.splice(1).join(" ")
        if (!ville) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.temp[2]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
            ]
        });

        weather.find({ search: ville, degreeType: degree }, function(err, result) {
            try {;
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setTitle(lang.commands.util.temp[3])
                        .setThumbnail(result[0].current.imageUrl)
                        .setDescription(`${lang.commands.util.temp[4]} ${result[0].location.name}`)
                        .addField(`🥶 ┇ **${lang.commands.util.temp[5]}**`, `${result[0].current.temperature}°${result[0].location.degreetype}`, true)
                        .addField("**Temp:**", `${result[0].current.skytext}`, true)
                        .addField(`**${lang.commands.util.temp[6]}**`, `${result[0].current.shortday}`, true)
                        .addField(`**${lang.commands.util.temp[7]}**`, `${result[0].current.feelslike}°${result[0].location.degreetype}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`, true)
                        .addField(`💦 ┇ **${lang.commands.util.temp[8]}**`, `${result[0].current.humidity}%`, true)
                        .addField(`💨 ┇ **${lang.commands.util.temp[9]}**`, `${result[0].current.winddisplay}`, true)
                        .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    ]
                });
            } catch (err) {
                console.log(err);

                return message.reply({
                    embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.util.temp[10]}`)
                    ]
                });
            }
        });
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Temp')
                .addField('Erreur', `\`\`\`${e}\`\`\``)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setColor(colors.PERSO)
            ]
        })
        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${lang.commands.problem[0]}`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        })
        console.log(e)
      }
    },
};