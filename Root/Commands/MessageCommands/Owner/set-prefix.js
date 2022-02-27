const db = require('quick.db');
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
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
    name: 'set-prefix',
    aliases: ["s-p"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async(client, message, args, container) => {
        var prefix = db.get(`prefix_${message.guild.id}`)
        if(prefix = null) prefix = container.Config.prefix
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }
        if (args[1]) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.owner.setP[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .setColor(colors.RED)
                ]
            })
        }
        if (args.join("") === container.Config.prefix || args.join("") === 'delete') {
            db.delete(`prefix_${message.guild.id}`);

                let logsC = db.get(`logs_${message.guild.id}`)
                if (!logsC) return;
                client.channels.cache.get(logsC).send({
                    embeds: [
                        new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[2]}`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.owner.setP[3], `\`${prefix}\``, true)
                .addField(lang.commands.ownera[1], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                    ]
                });
            return await message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.owner.setP[4]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.VERT)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }
        if (args[0].length > 5) {
            return await message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP["6"]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .setColor(colors.EPINGLE)
                ]
            })
        }
        db.set(`prefix_${message.guild.id}`, args[0]);

            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.setP[2]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.setP[3], `\`${prefix}\``, true)
            .addField(lang.commands.ownera[1], message.author, true)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });

        await message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${config.container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.setP["7"]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.VERT)
            .setTimestamp()
            .setFooter(`©${client.user.username}`, client.user.displayAvatarURL())
            ]
        })
    }
}