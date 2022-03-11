const colors = require('../../../Storage/json/colors.json')

const db = require('quick.db')

module.exports = {
    name: "calcul",
    aliases: ["cal"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.calcul[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
        if (!args[1]) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.calcul[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
        if (!args[2]) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.calcul[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        });
        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .addFields({
                name: 'Calcul :',
                value: `${args[0]} ${args[1]} ${args[2]}`
            }, {
                name: 'Résultat :',
                value: `${calculator(args[0], args[1], args[2])}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
            })
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setDescription(`${config.container.Emotes.autre.cool_pika}`)
            .setTimestamp()
        ]
    });

        function calculator(num1, operator, num2) {
            if (isNaN(num1)) return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${config.container.Emotes.attention} ┇ ${lang.commands.util.calcul[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            });
            if (isNaN(num2)) return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${config.container.Emotes.attention} ┇ ${lang.commands.util.calcul[4]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            });

            switch (operator) {
                case "+":
                    return parseInt(num1) + parseInt(num2);
                    break;
                case "-":
                    return num1 - num2;
                    break;
                case "*":
                    return num1 * num2;
                    break;
                case "/":
                    return (num1 / num2).toFixed(2);
                    break;
                default:
                    return message.reply({
                        embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.calcul[5]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                        .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        ]
                    });
                    break;
            }

        }
    },
};