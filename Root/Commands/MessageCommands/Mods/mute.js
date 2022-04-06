const colors = require('../../../Storage/json/colors.json')
const { Permissions } = require('discord.js')
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

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en'); 
        try {
        
        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
    })
    if(member.roles.cache.has(muteRole)) {
         message.reply({
        embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription(`${lang.commands.mods.mute[6]}`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
        ]
    })
    console.log('s')
}
if (member.id === message.guild.ownerID) return message.reply({
    embeds: [
    new container.Discord.MessageEmbed()
    .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.mute[1]}`)
    .setColor(colors.RED)
     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    ]
})
if (member.id === message.member.id) return message.reply({
    embeds: [
    new container.Discord.MessageEmbed()
    .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.mute[1]}`)
    .setColor(colors.RED)
     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    ]
})

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.mute[2]}`)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
        
        if (!member.manageable) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.mute[3]}`)
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
        
        const reason = args.slice(2).join(' ') || lang.commands.modsa[1]

        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                    name: 'Muted',
                    permissions: [
                        Permissions.FLAGS.MANAGE_MESSAGES,
                        Permissions.FLAGS.KICK_MEMBERS
                    ]
            });
            message.guild.channels.cache.forEach(channel => channel.createOverwrite.edit(muteRole.id, {
                    ADD_REACTIONS: false,
                    CONNECT: false,
                    SEND_MESSAGES: false
            }));
        };

        await member.roles.add(muteRole).then(() => {
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.autre.mute} ┇ ${member} ${lang.commands.mods.mute[6]}`)
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            })
        })
        setTimeout(() =>{
            message.delete();
          }, 300)
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.mute[4]}`)
                .setColor(colors.EPINGLE)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addField(lang.commands.mods.mute[5], member.user.username + '#' + member.user.discriminator, true)
                .addField(lang.commands.modsa[0], message.author.username + '#' + message.author.discriminator, true)
                .addField(`\u200B`, '\u200B')
                .addField(lang.commands.modsa[2], reason)
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``)
                ]
            })
            
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Mute')
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
    }
}