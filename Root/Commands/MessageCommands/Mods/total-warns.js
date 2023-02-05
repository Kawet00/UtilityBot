const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json');


module.exports = {
    name: "total-warns",
    description: "Check a users warnings",
    aliases: ["t-w"],
    userPermissions: ["MANAGE_MESSAGES"],

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;


        let warnings = await db.get(`warns_${message.guild.id}_${user.id}`);

        if (warnings === null) warnings = 0;

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPING)
            .setDescription(`${container.Emotes.pepe.pepe_a} ┇ **${user.username}** ${lang.commands.mods.totalW[0].replace('{WARNINGS}', warnings)}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
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
                .addField('Nom de la commande', 'Totla Warns')
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