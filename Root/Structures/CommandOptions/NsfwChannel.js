const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.nsfwChannel) return false;
    
    else {
        if (command.returnNsfwChannel == false || command.returnNoErrors) return true;
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
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.NsfwChannel[0]}`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            ],
            allowedMentions: {
                repliedUser: false
            }
        })
        return true
    }
}