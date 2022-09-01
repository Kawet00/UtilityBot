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
        try {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[2]);
        const number = args[1]

        if(!number) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[0]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                .setColor(container.Colors.EPINGLE)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(!Number.isNaN(+number)) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[1]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(!user) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emote.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[2]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(user.id == message.author.id) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.owner.deleteW[3]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(user.bot) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.owner.deleteW[4]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [ 
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.owner.deleteW[5]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
            .setColor(container.Colors.red)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
                message.delete();
              }, 300)
        })

        if(number === 'all') {
            db.delete(`warns_${message.guild.id}_${user.id}`)
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.autre.cool_pika} ┇ ${lang.commands.owner.deleteW[6].replace('{MEMBER}', user)}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setColor(container.Colors.VERT)
                    .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                    message.delete();
                  }, 300)
            })
            
        let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[7]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.deleteW[8], user, true)
            .addField(lang.commands.owner.deleteW[9], message.author, true)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                ]
            });
        } else {
            try {
            const Wdb = db.get(`warns_${message.guild.id}_${member.id}`)
            db.subtract(`warns_${message.guild.id}_${member.id}`, number)

            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.pepe.pepe_ok} ┇ ${lang.commands.owner.deleteW[10].replace('{NUMBER}', number)
                    .replace('{MEMBER}', user)}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                    .setColor(container.Colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                    message.delete();
                  }, 300)
            })
            let logsC = db.get(`logs_${message.guild.id}`)
            if (!logsC) return;
            message.guild.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[11]}`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .addField(lang.commands.owner.deleteW[8], user, true)
            .addField(lang.commands.owner.deleteW[9], message.author, true)
            .addField(lang.commands.owner.deleteW[12], number, true)
            .addField(lang.commands.owner.deleteW[13], Wdb)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                ]
            });
            } catch(e) {
                console.log(e)
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.deleteW[14].replace('{PREFIX}', container.Prefix)}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                        .setColor(container.Colors.RED)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                    ]
                }).then(() => {
                    setTimeout(() =>{
                        message.delete();
                      }, 300)
                })
            }
        }
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Delete Warns')
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