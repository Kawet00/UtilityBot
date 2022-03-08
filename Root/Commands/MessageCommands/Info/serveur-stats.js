const colors = require("../../../Storage/json/colors.json");
const moment = require("moment");
const emotes = require('../../../Storage/json/emotes.json');
const db = require('quick.db');

module.exports = {
    name: "serveur-stats",
    description: "none",
    aliases: ["s-s", "server-stats"],
    cooldown: 10000,

    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        const verificationLevels = {
            NONE: lang.commands.util.Ss[0],
            LOW: lang.commands.util.Ss[1],
            MEDIUM: lang.commands.util.Ss[2],
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };
        const memberS = message.guild.members.cache;
        let totalmembers = message.guild.members.cache.size;

        const EmbedStats = new container.Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle("STATS")
            .setDescription(lang.commands.util.Ss[3])
            .addFields({
                name: lang.commands.util.Ss[4] + " 👑 :",
                value: message.guild.owner,
                inline: true
            }, {
                name: "ID",
                value: message.guild.id,
                inline: true
            }, {
                name: lang.commands.util.Ss[5],
                value: message.guild.region,
                inline: true
            }, {
                name: lang.commands.util.Ss[6],
                value: verificationLevels[message.guild.verificationLevel],
                inline: true,
            }, {
                name: lang.commands.util.Ss[7],
                value: message.guild.roles.cache.size,
                inline: true,
            }, {
                name: lang.commands.util.Ss[8],
                value: message.guild.channels.cache.size,
                inline: true,
            }, {
                name: lang.commands.util.Ss[9],
                value: message.guild.afkTimeout / 60 + " minutes",
                inline: true,
            }, {
                name: lang.commands.util.Ss[10],
                value: totalmembers,
                inline: true,
            }, {
                name: lang.commands.util.Ss[11],
                value: memberS.filter((member) => member.presence.status === "online")
                    .size,
                inline: true,
            }, {
                name: lang.commands.util.Ss[12],
                value: message.guild.premiumSubscriptionCount || lang.commands.util.Ss[16],
                inline: true
            }, {
                name: lang.commands.util.Ss[13],
                value: message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '0',
                inline: true
            }, {
                name: lang.commands.util.Ss[14],
                value: `${message.guild.emojis.cache.size}/250 `,
                inline: true
            }, {
                name: lang.commands.util.Ss[15],
                value: `${container.Prefix}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`,
                inline: true
            })
            .setThumbnail(message.guild.iconURL({
                dynamic: true
            }))
            .setFooter(`${moment(message.guild.createdAt).format('DD/MM/YYYY')} • © ${client.user.username}`, client.user.avatarURL())
            .setTimestamp();

        message.channel.send(EmbedStats);
    },
};