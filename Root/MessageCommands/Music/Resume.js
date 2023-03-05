const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "resume",
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = getPrefix(message.guild.id)

        const queue = client.player.getQueue(message.guild.id);

        if (!queue) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
            ]
        });
        const success = queue.setPaused(false);

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.VERT)
                    .setDescription(success ? `${emotes.autre.wumpus_dj} ┇ **${queue.current.title}**, ${lang.commands.music.Resume[0]}` : `${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', prefix)}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}