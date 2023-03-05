const {QueryType} = require('discord-player')
const {getLang, getVolume} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {discordPlayer} = require('../../Storage/json/Config.json');

module.exports = {
    name: "play",
    description: "play",
    aliases: ["p"],
    voiceChannel: true,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[0]}`)
            ]
        });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[1]}`)
            ]
        });

        const queue = await client.player.createQueue(message.guild, {
            discordPlayer,
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[2]}`)
                ]
            });
        }

        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.VERT)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Play[3]} ${res.playlist ? lang.commands.music.Play[4] : lang.commands.music.Play[5]} ${lang.commands.music.Play[6]} `)
            ]
        });

        const dbVol = await getVolume(message.guild.id)
        if (dbVol) {
            queue.setVolume(dbVol)
        }

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
    }
}