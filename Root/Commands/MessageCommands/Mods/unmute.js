const colors = require('../../../Storage/json/colors.json');
const emotes = require('../../../Storage/json/emotes.json');
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
    name: 'unmute',
    aliases: ["um"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermissions: ["MUTE_MEMBERS"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[4]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
            })

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        })

        if (!member.manageable) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setDescription(`${config.container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        })

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .setDescription(`${config.container.Emotes.attention} ┇ ${lang.commands.mods.unmute[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            ]
        })

        await member.roles.remove(muteRole).then(() => {
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) lang = 'en';
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${config.container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.unmute[3]}`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.mods.unmute[4], member.author.tag, true)
                .addField(lang.commands.modsa[0], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .setDescription(`${config.container.Emotes.cool_pika} ┇ ${member} ${lang.commands.mods.unmute[5]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            })
        })
    }
}