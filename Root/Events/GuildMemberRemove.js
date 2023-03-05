const {getLang,getLeaveChannel,getLeaveMessage} = require('../Storage/db/manager');
const {EmbedBuilder} = require('discord.js')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
    name: "guildMemberRemove",

    run: async (member, client) => {

        let chx = await getLeaveChannel(member.guild.id);

        if (chx === null || chx === undefined) return;

        let lang = client.langs.get(await getLang(member.guild.id) || 'en')

        if(await getLeaveMessage(member.guild.id) !== null) {
            client.channels.cache.get(chx).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: member.user.username,
                            iconURL: member.user.avatarURL({
                                dynamic: true
                            })
                        })
                        .setColor(colors.PERSO)
                        .setThumbnail(member.user.avatarURL({
                            dynamic: true
                        }))
                        .setDescription(await getLeaveMessage(member.guild.id))
                        .setTitle(`${lang.events.guildMR[0]} !`)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                ]
            }).then(msg => {
                msg.react(emotes.blob.blob_s)
            })
        } else {
            client.channels.cache.get(chx).send({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: member.user.username,
                            iconURL: member.user.avatarURL({
                                dynamic: true
                            })
                        })
                        .setColor(colors.PERSO)
                        .setThumbnail(member.user.avatarURL({
                            dynamic: true
                        }))
                        .setDescription(`${emotes.blob.blob_s} ┇ **${member.user}** ${lang.events.guildMR[0]} **${member.guild.name}** !`)
                        .setTitle(`${member.user.username} ${lang.events.guildMR[0]} !`)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                ]
            }).then(msg => {
                msg.react(emotes.blob.blob_s)
            })
        }
    }
}