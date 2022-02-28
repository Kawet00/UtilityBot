module.exports = async function (client, message, command, Discord) {
    if (!command.voiceChannel) return false;
    else {
        if (!message.member.voice.channel) return message.channel.send(`${message.author}, You are not connected to an audio channel. ❌`);
        if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`${message.author}, You are not on the same audio channel as me. ❌`);
    }
}