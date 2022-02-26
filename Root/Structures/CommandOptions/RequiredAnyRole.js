const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.requiredAnyRole) return false;
    if (command.requiredAnyRole.some(i => message.member.roles.cache.has(i))) return false;
    else {
        let requiredRoles = []
        command.requiredAnyRole.forEach(i => requiredRoles.push(`<@&${i}>`))
        if (command.returnRequiredAnyRole == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.RequiredAnyRole[0]}`)
                .addField(lang.cmdOptions.RequiredAnyRole[1], `•${requiredRoles.join("\n•")}`)],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true;
        }
    }
