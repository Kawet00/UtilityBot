const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')
const fetch = require('node-fetch')

module.exports = {

    name: 'cat',
    aliases: ['c'],
    cooldown: 5000,

    run: async(client, message, args, container) => {
        if(db.get(`cat`) === false) return;

        try {
        
        let res = await fetch('https://api.thecatapi.com/v1/images/search');
        res = (await res.json())[0].url;
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle(lang.commands.fun.animaux[0])
            .setURL(res)
            .setDescription(`${container.Emotes.autre.cat}`)
            .setImage(res)
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
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
                .addField('Nom de la commande', 'Cat')
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