const colors = require('../../../Storage/json/colors.json');
const db = require('quick.db');

module.exports = {
    name: 'vote',
    description: 'vote',
    aliases: ["v"],
    cooldown: 20000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setDescription(`${container.Emotes.autre.giveaway_1} ┇ ${lang.commands.util.Vote["0"]}`)
           .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
           .addField('TOP.GG', '[VOTE](https://top.gg/bot/739863718547947652/vote)')
           .addField('WONDERBOTLIST.COM', '[VOTE](https://wonderbotlist.com/fr/bot/739863718547947652/vote)')
           .addField('DISCORDBOTLIST.COM', '[VOTE](https://discordbotlist.com/bots/utility-bot-9218/upvote)')
           .addField('DISCORDLABS.ORG', '[VOTE](https://bots.discordlabs.org/bot/739863718547947652/vote)')
          .setTimestamp()
            ]
        })
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Vote')
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
    },
};