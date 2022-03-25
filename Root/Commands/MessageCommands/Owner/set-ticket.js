const db = require('quick.db')

const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'set-ticket',
    aliase: ["s-t"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {
        let langg = db.get(`lang_${message.guild.id}`)

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(lang.commands.owner.setT[0].replace('{TheBot}', `[Ticket Utility Bot](https://www.utilitybot.ga/${langg}#shop)\n\n[${lang.commandsa[0]}](https://nepust.fr/)`))
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
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
                    .addField('Nom de la commande', 'Set Ticket')
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