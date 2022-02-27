const db = require('quick.db');
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
    onlyUsers: ["509765051435974692", "691644619758370846"],
    description: "Warn a member",
    userPermissions: ["MANAGE_MESSAGES"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) ||'en');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]);

        if (!user) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(container.Colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })

        if (user.bot) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(container.Colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })

        if (message.author.id === user.id) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setColor(container.Colors.RED)
            ]
        }).then(msg => {
            msg.delete({
                timeout: 10000
            })
        });

        if (message.guild.ownerID === user.id) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.warn[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(container.Colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })

        let reason = args.slice(2).join(" ") || lang.commands.modsa[2];

        let warnings = db.get(`warns_${message.guild.id}_${user.id}`);

        if (warnings === null) {
            db.add(`warns_${message.guild.id}_${user.id}`, 1);
            user.send({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[4]}`)
                .addFields({
                    name: lang.commands.modsa[6],
                    value: message.guild.name,
                    inline: true
                }, {
                    name: lang.commands.modsa[1],
                    value: reason+`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                    inline: true
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .setColor(container.Colors.EPINGLE)
            ]
        })
            await message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setDescription(`${container.Emotes.pepe.pepe_w} ┇ **${user.username}** ${lang.commands.mods.warn[5]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        if (warnings !== null) {
            db.add(`warns_${message.guild.id}_${user.id}`, 1)
            user.send({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[4]}`)
                .addFields({
                    name: lang.commands.modsa[6],    
                    value: message.guild.name,
                    inline: true
                }, {
                    name: lang.commands.modsa[1],
                    value: reason+`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                    inline: true
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .setColor(container.Colors.EPINGLE)
            ]
        })
            await message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_w} ┇ **${user.username}** ${lang.commands.mods.warn[5]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(container.Colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        }

        let logsC = db.get(`logs_${message.guild.id}`)
        if (!logsC) return;
        client.channels.cache.get(logsC).send({
            embeds: [
                new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.warn[6]}`)
            .setColor(container.Colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.mods.warn[7], user.tag, true)
            .addField(lang.commands.modsa[0], message.author, true)
            .addField(lang.commands.mods.warn[8], warnings, true)
            .addField(`\u200B`, '\u200B')
            .addField(lang.commands.modsa[1], reason)
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        });
    }
}