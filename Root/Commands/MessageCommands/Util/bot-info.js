const colors = require('../../../Storage/json/colors.json')
const os = require('os')
const moment = require('moment')
require('moment-duration-format')
const process = require('process')
const version = require('../../../../package.json')
const db = require('quick.db')

module.exports = {
  name: 'bot-info',
  onlyUsers: ["509765051435974692", "691644619758370846"],
  description: 'none',
  aliases: ["b-i"],

  run: async (client, message, args, Discord) => {
    client.langs = new Discord.Collection()
    
          const Handler = require(`../../../Structures/Handlers/Handler`);
      await Handler.loadLangs(client);
    let days = Math.floor(client.uptime / 86400000);
    let hours = Math.floor(client.uptime / 3600000) % 24;
    let minutes = Math.floor(client.uptime / 60000) % 60;
    let seconds = Math.floor(client.uptime / 1000) % 60;
    
    var prefix = db.get(`prefix_${message.guild.id}` || container.Config.prefix)
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`))

    const core = os.cpus()[0]
    message.reply({
      embeds: [
      new Discord.MessageEmbed()
      .setColor(colors.PERSO)
      .setTitle(`BOTINFO`)
      .setThumbnail(client.user.displayAvatarURL({
        dynamic: true,
        size: 512
      }))
      .addFields({
        name: `🆔 ┇ ${lang.commands.util.BI[0]}:`,
        value: `${client.user.id}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
        inline: true
      }, {
        name: `__**🕵️‍♂️ ┇ ${lang.commands.util.BI[2]}:**__`,
        value: `**• Status :** ${client.user.presence.status}
        **• ${lang.commands.util["Serveur"]} :** ${client.guilds.cache.size}
        **• ${lang.commands.util.BI[3]}:** ${moment(client.user.createdAt).format('MM/DD/YYYY')}
        **• ${lang.commands.util.BI[4]}:** __${version["author"]}__
        **• ${lang.commands.util.BI[5]}:** ${version["version"]}
        **• ${lang.commands.util.BI[6]}:** \`${prefix}\``,
        inline: true
      }, {
        name: `__**🕵️‍♂️ ┇ ${lang.commands.util.BI[7]}**__`,
        value: `**• ${lang.commands.util.BI[8]}:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    **• ${lang.commands.util.BI[9]}:** ${days} ${lang.commands.util.BI[10]}, ${hours} ${lang.commands.util.BI[11]}, ${minutes} minute(s), ${seconds} ${lang.commands.util.BI[12]}
    **• ${lang.commands.util.BI[13]}:** ${client.ws.ping}ms
        **• Platforme :** ${process.platform}
        **• ${lang.commands.util.BI[14]}:** ${process.version}
        **• ${lang.commands.util.BI[15]}:** ${Discord.version}
        **${lang.commands.util.BI[16]}:**
  \u3000 **• Cores**: ${os.cpus().length},
  \u3000 **• Model**: ${core.model},
  \u3000 **• ${lang.commands.util.BI[17]}**: ${core.speed} MHZ,
        **${lang.commands.util.BI[18]}:**
  \u3000 • Total: ${formatBytes(process.memoryUsage().heapTotal)},
  \u3000 • ${lang.commands.util.BI[19]}: ${formatBytes(process.memoryUsage().heapUsed)}`,
        inline: true
      })
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
      .setTimestamp()
    ]
  })

    function formatBytes(bytes) {
      if (bytes === 0) return '0 Bytes'
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      const i = Math.floor(Math.log(bytes) / Math.log(1024))
      return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${sizes[i]}`
    }
  }
}