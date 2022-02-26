const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.clientPermissions) return false;
    let missing = []
    command.clientPermissions.forEach(i => {
        if (!message.guild.me.permissions.has(i)) missing.push(i)
    })
    if (missing.length == 0) return false;
    else {
        if (command.returnClientPermissions == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.ClientPerm[0]}`)
                .addField(lang.cmdOptions.ClientPerm[1], `•${missing.join("\n•")}`)],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true
        }
    }