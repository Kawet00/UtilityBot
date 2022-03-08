const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = async function (client, message, command, Discord) {
    const lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
    if (!command.voiceChannel) return false;
    else {
        if (!message.member.voice.channel) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.VoiceChannel[0]}`)
                .setColor(colors.RED)
                .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        });
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.VoiceChannel[1]}`)
                .setColor(colors.RED)
                .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        });
    }
}