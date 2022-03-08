const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.onlyChannels) return false;
    if (command.onlyChannels.some(id => id == message.channel.id)) return false;
    else {
        let onlyChannels = []
        command.onlyChannels.forEach(id => {
            onlyChannels.push(`<#${id}>`)
        })
        if (command.returnOnlyChannels == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyChannels[0]}`)
                .addField(lang.cmdOptions.OnlyChannels[1], `•${onlyChannels.join("\n•")}`)
            ],
            allowedMentions: {
                repliedUser: false
            }
        })
        return true;
    }
}