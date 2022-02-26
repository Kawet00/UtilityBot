const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.onlyGuilds) return false;
    if (command.onlyGuilds.some(id => id == message.guild.id)) return false;
    else {
        let onlyGuilds = []
        command.onlyGuilds.forEach(id => {
            onlyGuilds.push(client.guilds.cache.get(id).name)
        })
        if (command.returnOnlyGuilds == false || command.returnNoErrors) return true;
        else message.reply({
            embeds: [new Discord.MessageEmbed()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyGuild[0]}`)
                .addField(lang.cmdOptions.OnlyGuild[1], `•${onlyGuilds.join("\n•")}`)],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return true
        }
    }
