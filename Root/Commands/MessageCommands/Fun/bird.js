const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')
const fetch = require('node-fetch');

module.exports = {
    name: 'bird',
    aliases: ["bi"],
    cooldown: 10000,

    run: async(client, message, args, container) => {
        if(db.get(`bird`) === false) return;

        try {
      let res = await fetch('https://some-random-api.ml/img/bird');
      res = await res.json();
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(res.link)
            .setDescription(`${container.Emotes.autre.bird}`)
            .setImage(res.link)
             .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            ]
        });
        setTimeout(() =>{
            message.delete();
          }, 300)
          
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Bird')
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