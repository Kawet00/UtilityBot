const {getLang, getPrefix, updateVolume} = require('../../Storage/db/manager');
const {opt} = require('../../Storage/json/Config.json')
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "volume",
    aliases: ["vol"],
    voiceChannel: true,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

        const maxVol = opt.maxVol;
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
            ]
        });

        const vol = parseInt(args[0]);

        if (!vol) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Volume[0]} **${queue.volume}** 🔊\n${lang.commands.music.Volume[1].replace('{MAXV}', maxVol)}`)
            ]
        });

        if (queue.volume === vol) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Volume[2]}`)
            ]
        });

        if (vol < 0 || vol > maxVol) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.music.Volume[3]}`)
            ]
        });

        const success = queue.setVolume(vol)
        await updateVolume(message.guild.id, vol)

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(success ? colors.VERT : colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(success ? `${emotes.pepe.pepe_ok} ┇ ${lang.commands.music.Volume[4]} **%${vol}**/**${maxVol}** 🔊` : `${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', prefix)}`)
            ]
        });
    }
}