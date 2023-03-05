const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "back",
    description: "back",
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

            const queue = client.player.getQueue(message.guild.id);

            if (!queue || !queue.playing) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.RED)
                        .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setThumbnail()
                ]
            });

            if (!queue.previousTracks[1]) return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.RED)
                        .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Back[0]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setThumbnail()
                ]
            });

            await queue.back();

            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.VERT)
                        .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.music.Back[1]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setThumbnail()
                ]
            });
    }
};