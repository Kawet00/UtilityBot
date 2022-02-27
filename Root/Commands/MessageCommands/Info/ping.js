const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
            aliases: ["p", "pi", "pong"],
            description: "Savoir le ping du bot",
            name: "ping",
            onlyUsers: ["509765051435974692", "691644619758370846"],
            cooldown: 5000,

            run: async (client, message, args, container) => {

              let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

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
   .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
  .setColor(colors.PERSO)
        ]
})
msg.delete()
    }
};