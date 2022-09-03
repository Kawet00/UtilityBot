const colors = require('../../../Storage/json/colors.json');
;
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
    userPermissions: ["MUTE_MEMBERS"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        const member = message.mentions.members.first()
        if (!member) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[4]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            ]
            })

        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[0]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            ]
        })

        if (!member.manageable) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.unmute[1]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            ]
        })

        const muteRole = message.guild.roles.cache.find(role => role.name === 'Muted')
        if (!muteRole) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.mods.unmute[2]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            ]
        })

        await member.roles.remove(muteRole).then(() => {
            message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.VERT)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${member} ${lang.commands.mods.unmute[5]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                ]
            })
            
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.mods.unmute[3]}`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .addField(lang.commands.mods.unmute[4], member.author.tag, true)
                .addField(lang.commands.modsa[0], `<@!${message.author.id}>`, true)
                .addField(`\u200B`, '\u200B')
                .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                ]
            });
        })
        setTimeout(() =>{
            message.delete();
          }, 300)
          
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Unmute')
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