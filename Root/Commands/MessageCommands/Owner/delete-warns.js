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
    name: 'delete-warns',
    description: 'flm',
    aliases: ["d-w"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        let logsC = db.get(`logs_${message.guild.id}`)

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[2]);
        const number = args[1]

        if(!number) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(` ┇ ${lang.commands.owner.deleteW[0]}`)
                .setColor(container.Colors.EPINGLE)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(!Number.isNaN(+number)) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(` ┇ ${lang.commands.owner.deleteW[1]}`)
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            ]
        })

        if(!user) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emote.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[2]}`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
            ]
        })

        if(user.id == message.author.id) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(` ┇ ${lang.commands.owner.deleteW[3]}`)
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(user.bot) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(` ┇ ${lang.commands.owner.deleteW[4]}`)
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [ 
            new container.Discord.MessageEmbed()
            .setDescription(` ┇ ${lang.commands.owner.deleteW[5]}`)
            .setColor(container.Colors.red)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        })

        if(number === 'all') {
            db.delete(`warns_${message.guild.id}_${user.id}`)
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(` ┇ ${lang.commands.owner.deleteW[6].replace('{MEMBER}', user)}`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setColor(container.Colors.VERT)
                    .setTimestamp()
                ]
            })
            
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[7]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.deleteW[8], user, true)
            .addField(lang.commands.owner.deleteW[9], message.author, true)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
        } else {
            try {
            const Wdb = db.get(`warns_${message.guild.id}_${member.id}`)
            db.subtract(`warns_${message.guild.id}_${member.id}`, number)

            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(` ┇ ${lang.commands.owner.deleteW[10].replace('{NUMBER}', number)
                                                                         .replace('{MEMBER}', user)}`)
                    .setColor(container.Colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                ]
            })
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[11]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.deleteW[8], user, true)
            .addField(lang.commands.owner.deleteW[9], message.author, true)
            .addField(lang.commands.owner.deleteW[12], number, true)
            .addField(lang.commands.owner.deleteW[13], Wdb)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
            } catch(e) {
                console.log(e)
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setDescription(` ┇ ${lang.commands.owner.deleteW[14].replace('{PREFIX}', container.Prefix)}`)
                        .setColor(container.Colors.RED)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                    ]
                })
            }
        }
    }
}