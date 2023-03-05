const moment = require("moment");
const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "serveur-stats",
    description: "none",
    aliases: ["s-s", "server-stats"],
    cooldown: 10000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

        const verificationLevels = {
            0: lang.commands.util.Ss[0],
            1: lang.commands.util.Ss[1],
            2: lang.commands.util.Ss[2],
            3: '(╯°□°）╯︵ ┻━┻',
            4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setTitle(`${emotes.blob.blob_t} ┇ STATS`)
                    .setDescription(lang.commands.util.Ss[3])
                    .addFields(
                        {name: lang.commands.util.Ss[4] + " 👑 :", value: `${await client.users.fetch(message.guild.ownerId).then(user => user.username)}`, inline: true},
                        {name: "ID", value: message.guild.id, inline: true},
                        {name: lang.commands.util.Ss[5], value: verificationLevels[message.guild.verificationLevel], inline: true},
                        {name: lang.commands.util.Ss[6], value: message.guild.roles.cache.size.toString(), inline: true},
                        {name: lang.commands.util.Ss[7], value: message.guild.channels.cache.size.toString(), inline: true},
                        {name: lang.commands.util.Ss[8], value: message.guild.afkTimeout / 60 + " minutes", inline: true},
                        {name: lang.commands.util.Ss[9], value: message.guild.members.cache.size.toString(), inline: true},
                        {name: lang.commands.util.Ss[10], value: `${await message.guild.members.fetch().then((members) => members.filter((member) => !member.user.bot && member.presence?.status != 'invisible').size)}`, inline: true},
                        {name: lang.commands.util.Ss[11], value: `${await message.guild.members.fetch().then((members) => members.filter((member) => !member.user.bot && member.presence?.status != 'online' && 'dnd' && 'idle').size)}`, inline: true},
                        {name: lang.commands.util.Ss[12], value: message.guild.premiumSubscriptionCount || lang.commands.util.Ss[16], inline: true},
                        {name: lang.commands.util.Ss[13], value: message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '0', inline: true},
                        {name: lang.commands.util.Ss[14], value: `${message.guild.emojis.cache.size}/250 `, inline: true},
                        {name: lang.commands.util.Ss[15], value: `\`${prefix}\``, inline: true}
                    )
                    .setThumbnail(message.guild.iconURL({dynamic: true}))
                    .setFooter({text: `${moment(message.guild.createdAt).format('DD/MM/YYYY')} • © ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
};