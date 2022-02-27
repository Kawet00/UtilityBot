const colors = require('../../../Storage/json/colors.json')
const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
function dateFormat(date) {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
      })
    }

module.exports = {
    name: 'mute',
    description: 'none',
    aliases: ["m"],
    userPermissions: ["MUTE_MEMBERS"],

    run: async (client, message, args, container) => {
        console.log('1')
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en'); 
        
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
    })
    if(member.roles.cache.has(muteRole)) {
         message.reply({
        embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription('EN ATTENTE')
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
        ]
    })
    console.log('s')
}
if (member.id === message.guild.ownerID) return message.reply({
    embeds: [
    new container.Discord.MessageEmbed()
    .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.mods.mute[1]}`)
    .setColor(colors.RED)
     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
    .setTimestamp()
    ]
})
if (member.id === message.member.id) return message.reply({
    embeds: [
    new container.Discord.MessageEmbed()
    .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.mods.mute[1]}`)
    .setColor(colors.RED)
     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
    .setTimestamp()
    ]
})

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.mods.mute[2]}`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })
        
        if (!member.manageable) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.mods.mute[3]}`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            ]
        })
        
        const reason = args.slice(2).join(' ') || lang.commands.modsa[1]

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    Permissions: 0
                }
            });
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }));
        };

        await member.roles.add(muteRole).then(() => {
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[4]}`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                .addField(lang.commands.mods.mute[5], member.author.tag, true)
                .addField(lang.commands.modsa[0], message.author, true)
                .addField(`\u200B`, '\u200B')
                .addField(lang.commands.modsa[2], reason)
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``)
                ]
            });
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.mute} ┇ ${member} ${lang.commands.mods.mute[6]}`)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
                ]
            })
        })
    }
}