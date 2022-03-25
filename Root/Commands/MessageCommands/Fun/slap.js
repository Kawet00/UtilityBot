const superagent = require('superagent');

const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'slap',
    cooldown: 10000,

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        if (!message.mentions.users.first()) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.fun.slap[0]} `)
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })

        if (message.mentions.users.first().id === client.user.id) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.fun.slap[1]}`)
            .setColor(colors.RED)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
        
        if (message.mentions.users.first().id == message.author.id) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.RED)
            .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.fun.slap[2]}`)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })

        const { body } = await superagent
            .get("https://nekos.life/api/v2/img/slap");

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.slap[3]
            .replace('{USERM}', message.mentions.users.first().username)
            .replace('{USER}', message.author.username)
            .replace('{EMOJI}', container.Emotes.pepe.pepe_wa)
            )
            .setImage(body.url)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            ]
        })
        setTimeout(() =>{
            message.delete();
          }, 300)
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Slap')
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