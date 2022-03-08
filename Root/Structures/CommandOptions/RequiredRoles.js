const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.requiredRoles) return false;
    let missing = []
    command.requiredRoles.forEach(role => {
        if (!message.member.roles.cache.has(role)) missing.push(`<@&${role}>`);
    })
    if (missing.length == 0) return false;
    else {
        if (command.returnRequiredRoles == false || command.returnNoErrors) return true;
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
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.RequiredRoles[0]}`)
                .addField(lang.cmdOptions.RequiredRoles[1], `•${missing.join("\n•")}`)
            ],
            allowedMentions: {
                repliedUser: false
            }
        })
        return true
    }
}