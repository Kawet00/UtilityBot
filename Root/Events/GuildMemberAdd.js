const {getLang,getLeaveChannel,getLeaveMessage} = require('../Storage/db/manager');
const {EmbedBuilder} = require('discord.js')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')

module.exports = {
    name: "guildMemberAdd",

    run: async (member, client) => {
        let chx = await getJoinChannel(member.guild.id);

        if (chx === null || chx === undefined) return;

        let lang = client.langs.get(await getLang(member.guild.id) || 'en')

        if(await getJoinMessage(member.guild.id) !== null) {
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
                        .setDescription(await getJoinMessage(member.guild.id))
                        .setTitle(`${lang.events.guildMA[1]} !`)
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
                        .setDescription(`${emotes.blob.blob_s} ┇ ${lang.events.guildMA[0]} **${member.user}** ${lang.events.guildMA[1]} **${member.guild.name}** !`)
                        .setTitle(`${lang.events.guildMA[0]} ${member.user.username} !`)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                ]
            }).then(msg => {
                msg.react(emotes.blob.blob_s)
            })
        }

        if(await getJoinRole(member.guild.id) !== null || await getJoinRole(member.guild.id) !== undefined) {
            member.roles.add(await getJoinRole(member.guild.id))
        }
    }
}