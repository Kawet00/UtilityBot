const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'clear-list',
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setThumbnail()
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
            ]
        });

        if (!queue.tracks[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setThumbnail()
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Clear[0]}`)
            ]
        });

        await queue.clear();

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.VERT)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setThumbnail()
                    .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.music.Clear[1]}`)
            ]
        });
    }
};