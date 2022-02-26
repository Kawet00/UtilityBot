const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.anyClientPermission) return false;
    if (command.anyClientPermission.some(i => message.member.permissions.has(i))) return false;
    else {
        if (command.returnAnyClientPermissions == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.AnyClientPerm[0]}`)
                .addField(lang.cmdOptions.AnyClientPerm[1], `•${command.anyClientPermission.join("\n•")}`)],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true
        }
    }