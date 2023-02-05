const db = require("quick.db")
const config = require('../../Storage/json/Config.json')
const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')

module.exports = async function (client, message, command, isInteraction, interactionType, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.cooldown) return false;
    const currentTime = Date.now()
    const user = message.member.user
    const cooldown = command.cooldown
    const oldTime = await db.get(`CooldownSystem.${message.guild.id}.${command.name}.${interactionType ?? "Normal"}.${user.id}`) ?? 0
    if (config.developers.some(id => user.id == id)) return false;
    if (Math.floor(currentTime - oldTime) >= cooldown || oldTime == 0) {
        await db.set(`CooldownSystem.${message.guild.id}.${command.name}.${interactionType ?? "Normal"}.${user.id}`, currentTime)
        return false;
    } else {
        if (command.returnCooldown == false || command.returnNoErrors) return true;
        else {
            message.reply({
                embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor({
                        name: message.member.user.tag,
                        iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                    })
                    .setTimestamp()
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.EPINGLE)
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.Cooldown[0]}`)
                    .addField(lang.cmdOptions.Cooldown[1], `<t:${Math.floor(Math.floor(oldTime + cooldown) / 1000)}>`)],
                    allowedMentions: {
                        repliedUser: false
                    }
                })
                return true
            }
        }
    }