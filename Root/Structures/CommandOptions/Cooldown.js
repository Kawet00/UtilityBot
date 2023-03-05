const db = require("quick.db")
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json')
const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')

module.exports = async (client, message, Command, InteractionType) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.cooldown) return true;
    const currentTime = Date.now()
    const user = message.member.user
    const cooldown = Command.cooldown
    const oldTime = await db.get(`CooldownSystem.${message.guild.id}.${Command.name}.${InteractionType ?? "Normal"}.${user.id}`) ?? 0
    if (developers.some(id => user.id === id)) return true;
    if (Math.floor(currentTime - oldTime) >= cooldown || oldTime === 0) {
        await db.set(`CooldownSystem.${message.guild.id}.${Command.name}.${InteractionType ?? "Normal"}.${user.id}`, currentTime)
        return false;
    } else {
        if (Command.returnCooldownErrors === false || Command.returnNoErrors === false) return false;
        else {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setAuthor({
                            name: message.member.user.tag,
                            iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                        })
                        .setTimestamp()
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setColor(colors.EPINGLE)
                        .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.Cooldown[0]}`)
                        .addFields(
                            {name: lang.cmdOptions.Cooldown[1], value: `<t:${Math.floor(Math.floor(oldTime + cooldown) / 1000)}>`}
                        )
                ],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true
        }
    }
}