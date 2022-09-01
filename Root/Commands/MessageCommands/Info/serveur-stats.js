const colors = require("../../../Storage/json/colors.json");
const moment = require("moment");
;
const db = require('quick.db');

module.exports = {
    name: "serveur-stats",
    description: "none",
    aliases: ["s-s", "server-stats"],
    cooldown: 10000,

    run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        const verificationLevels = {
            NONE: lang.commands.util.Ss[0],
            LOW: lang.commands.util.Ss[1],
            MEDIUM: lang.commands.util.Ss[2],
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        message.channel.send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(`${container.Emotes.blob.blob_t} ┇ STATS`)
                .setDescription(lang.commands.util.Ss[3])
                .addField(lang.commands.util.Ss[4] + " 👑 :", await message.guild.fetchOwner().then(o => o.user.username), true)
                .addField("ID", message.guild.id, true)
                .addField(lang.commands.util.Ss[5], verificationLevels[message.guild.verificationLevel], true)
                .addField(lang.commands.util.Ss[6], message.guild.roles.cache.size.toString(), true)    
                .addField(lang.commands.util.Ss[7], message.guild.channels.cache.size.toString(), true)
                .addField(lang.commands.util.Ss[8], message.guild.afkTimeout / 60 + " minutes", true)
                .addField(lang.commands.util.Ss[9], message.guild.members.cache.size.toString(), true)
                .addField(lang.commands.util.Ss[10], `${await message.guild.members.fetch().then((members) => members.filter((member) => !member.user.bot && member.presence?.status != 'invisible').size)}`, true)
                .addField(lang.commands.util.Ss[11], `${await message.guild.members.fetch().then((members) => members.filter((member) => !member.user.bot && member.presence?.status != 'online' && 'dnd' && 'idle').size)}`, true)
                .addField(lang.commands.util.Ss[12], message.guild.premiumSubscriptionCount || lang.commands.util.Ss[16], true)
                .addField(lang.commands.util.Ss[13], message.guild.premiumTier ? `Tier ${message.guild.premiumTier}` : '0', true)
                .addField(lang.commands.util.Ss[14], `${message.guild.emojis.cache.size}/250 `, true)
                .addField(lang.commands.util.Ss[15], `${container.Prefix}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`, true)
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))
                .setFooter({ text: `${moment(message.guild.createdAt).format('DD/MM/YYYY')} • © ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
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
                    .addField('Nom de la commande', 'Server Stats')
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