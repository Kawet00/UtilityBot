const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'pause',
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id)

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });

        const success = queue.setPaused(true);

        return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(success ? `${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Pause[0].replace('{TITLE}', queue.current.title)}` : `${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', prefix)}`)
                    .setColor(success ? colors.VERT : colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}