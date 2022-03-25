const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.anyUserPermission) return false;
    if (command.anyUserPermission.some(i => message.member.permissions.has(i))) return false;
    else {
        if (command.returnAnyUserPermissions == false || command.returnNoErrors) return true;
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
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.AnyUserPerm[0]}`)
                .addField(lang.cmdOptions.AnyUserPerm[1], `•${command.anyUserPermission.join("\n•")}`)
            ],
            allowedMentions: {
                repliedUser: false
            }
        })
        return true
    }
}