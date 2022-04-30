const config = require("../../Storage/json/Config.json")
const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.ownerOnly) return false;
    if (config.developers.some(id => message.member.user.id == id)) return false
    else {
        if (command.returnOwnerOnly == false || command.returnNoErrors) return true;
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
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.cmdOptions.OwnerOnly[0]}`)
            ],
            allowedMentions: {
                repliedUser: false
            }
        })
        return true
    }
}