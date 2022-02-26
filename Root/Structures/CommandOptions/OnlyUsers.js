const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.onlyUsers) return false;
    if (command.onlyUsers.some(i => i == message.member.user.id)) return false;
    else {
        let onlyUsers = []
        command.onlyUsers.forEach(id => {
            onlyUsers.push(`<@${id}>`)
        })
        if (command.returnOnlyUsers == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyUsers[0]}`)
                .addField(lang.cmdOptions.OnlyUsers[1], `• ${onlyUsers.join("\n• ")}`)],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true;
        }
    }