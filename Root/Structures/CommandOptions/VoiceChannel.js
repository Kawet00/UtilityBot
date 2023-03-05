const emotes = require('../../Storage/json/emotes.json')
const colors = require('../../Storage/json/colors.json')
const {getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');

module.exports = async (client, message, Command) => {
    const lang = client.langs.get(await getPrefix(message.guild.id) || 'en')
    if (!Command.voiceChannel) return true;
    else {
        if (!message.member.voice.channel) return message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.VoiceChannel[0]}`)
                    .setColor(colors.RED)
                    .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
            ]
        });

        if (message.member.voice?.channel.id !== message.guild.members.me.voice?.channel.id && message.member.voice) return message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.VoiceChannel[1]}`)
                    .setColor(colors.RED)
                    .setFooter({ text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
            ]
        });
    }
}