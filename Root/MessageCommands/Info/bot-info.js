const colors = require('../../Storage/json/colors.json');
const os = require('os');
const moment = require('moment');
require('moment-duration-format');
const process = require('process');
const JSON = require('../../../package.json');
const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, version} = require('discord.js');

module.exports = {
    name: 'bot-info',
    description: 'none',
    aliases: ["b-i"],

    run: async (client, message) => {
        let days = Math.floor(client.uptime / 86400000);
        let hours = Math.floor(client.uptime / 3600000) % 24;
        let minutes = Math.floor(client.uptime / 60000) % 60;
        let seconds = Math.floor(client.uptime / 1000) % 60;

        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

        const core = os.cpus()[0]
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(`BOTINFO`)
                    .setThumbnail(client.user.displayAvatarURL({
                        dynamic: true,
                        size: 512
                    }))
                    .addFields({
                        name: `🆔 ┇ ${lang.commands.util.BI[0]}:`,
                        value: `${client.user.id}`,
                        inline: true
                    }, {
                        name: `__**🕵️‍♂️ ┇ ${lang.commands.util.BI[1]}:**__`,
                        value: `**• Status :** ${client.user.presence.status}
        **• ${lang.commands.util.BI[19]}:** ${client.guilds.cache.size}
        **• ${lang.commands.util.BI[20]}:** ${client.users.cache.size}
        **• ${lang.commands.util.BI[2]}:** ${moment(client.user.createdAt).format('MM/DD/YYYY')}
        **• ${lang.commands.util.BI[3]}:** __${JSON["author"]}__
        **• ${lang.commands.util.BI[4]}:** ${JSON["version"]}
        **• ${lang.commands.util.BI[5]}:** ${prefix}`,
                        inline: true
                    }, {
                        name: `__**🕵️‍♂️ ┇ ${lang.commands.util.BI[6]}**__:`,
                        value: `**• ${lang.commands.util.BI[7]}:** ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB
    **• ${lang.commands.util.BI[8]}:** ${days} ${lang.commands.util.BI[9]}, ${hours} ${lang.commands.util.BI[10]}, ${minutes} minute(s), ${seconds} ${lang.commands.util.BI[11]}
    **• ${lang.commands.util.BI[12]}:** ${client.ws.ping}ms
        **• Platforme :** ${process.platform}
        **• ${lang.commands.util.BI[13]}:** ${process.version}
        **• ${lang.commands.util.BI[14]}:** ${version}
        **${lang.commands.util.BI[15]}:**
  \u3000 **• Cores**: ${os.cpus().length},
  \u3000 **• Model**: ${core.model},
  \u3000 **• ${lang.commands.util.BI[16]}**: ${core.speed} MHZ,
        **${lang.commands.util.BI[17]}:**
  \u3000 • Total: ${formatBytes(process.memoryUsage().heapTotal)},
  \u3000 • ${lang.commands.util.BI[18]}: ${formatBytes(process.memoryUsage().heapUsed)}`,
                        inline: true
                    })
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
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