const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
            aliases: ["p", "pi", "pong"],
            description: "Savoir le ping du bot",
            name: "ping",
            cooldown: 5000,

            run: async (client, message, args, container) => {

              let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
              try {

        const msg = await message.channel.send('Pinging...');
        const latency = msg.createdTimestamp - message.createdTimestamp;
  
        message.reply({
          embeds: [
            new container.Discord.MessageEmbed()
            .addFields(
              {
                name: `\`\`\`Latence:\`\`\``,
                value: `**${latency}**ms\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                inline: true
              }, {
                name: `\`\`\`Discord API:\`\`\``,
                value: `**${Math.round(client.ws.ping)}**ms`,
                inline: true
              }
  )
   .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
  .setColor(colors.PERSO)
        ]
})
msg.delete()
setTimeout(() =>{
  message.delete();
}, 300)
} catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Ping')
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
};