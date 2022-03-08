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
    onlyUsers: ["509765051435974692", "691644619758370846"],
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
                .setDescription(' ┇ Veuillez mettre le nombre de warns a enlever ou bien mettait `all` pour supprimer tout ces warns.')
                .setColor(container.Colors.EPINGLE)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(!Number.isNaN(+number)) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(' ┇ Veuillez mettre soit `all` pour supprimer tout les warns soit un nombre de warn(s) a supprimer')
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            ]
        })

        if(!user) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emote.pepe.pepe_a} ┇ Vous devez mentionner le membre a qui enlever les warns.`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setColor(container.Colors.EPINGLE)
                .setTimestamp()
            ]
        })

        if(user.id == message.author.id) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(' ┇ Vous ne pouvez pas enlever vos propres warns.')
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(user.bot) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(' ┇ Vous ne pouvez pas warns des bots.')
                .setColor(container.Colors.red)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })

        if(message.member.roles.highest.comparePositionTo(user.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply({
            embeds: [ 
            new container.Discord.MessageEmbed()
            .setDescription(' ┇ Vous ne pouvez pas enlever les warns des membres avec un rôle plus haut que le votre.')
            .setColor(container.Colors.red)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        })

        if(number === 'all') {
            db.delete(`warns_${message.guild.id}_${member.id}`)
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(` ┇ Je vient de supprimer tout les warns de ${member}`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setColor(container.Colors.VERT)
                    .setTimestamp()
                ]
            })
            
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ Je vient de supprimer tout les warns d'un membre.`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField('Membre', user, true)
            .addField('Modérateur résponsable', message.author, true)
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
                    .setDescription(` ┇ Je vient de supprimer ${number} warn(s) à ${user}`)
                    .setColor(container.Colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                ]
            })
            if (!logsC) return;
            client.channels.cache.get(logsC).send({
                embeds: [
                    new container.Discord.MessageEmbed()
            .setTitle(`${container.Emotes.pepe.pepe_a} ┇ Je vient de supprimer un certains nombre de warn(s) d'un membre.`)
            .setColor(colors.EPINGLE)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            .setTimestamp()
            .addField('Membre', user, true)
            .addField('Modérateur résponsable', message.author, true)
            .addField('Nombre de warn(s) enlever', number, true)
            .addField('Total de warn du membre', Wdb)
            .addField(`\u200B`, '\u200B')
            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            });
            } catch(e) {
                console.log(e)
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setDescription(` ┇ Un problème est survenue, veuillez faire un signalement au support en faisent \`${container.Prefix}report\` et en sélécctionnent \`bug\`.`)
                        .setColor(container.Colors.red)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                    ]
                })
            }
        }
    }
}