const {QueryType} = require('discord-player')
const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "search",
    voiceChannel: true,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id);

        if (!args[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Search[0]}`)
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
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Search[1]}`)
            ]
        });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new EmbedBuilder();

        embed.setColor(colors.PERSO);
        embed.setTitle(`${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Search[2]} ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n  ${lang.commands.music.Search[3].replace('{MAXT}', maxTracks.length)}`);

        embed.setTimestamp();
        embed.setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

        message.reply({embeds: [embed]});

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_ok} ┇ ${lang.commands.music.Search[4]}`)
                        .setColor(colors.VERT)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[5].replace('{MAXT}', maxTracks.length)}`)
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            });

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(ccolors.EPINGLE)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[6]}`)
                    ]
                });
            }

            await message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${eEmotes.pepe.pepe_ok} ┇ ${lang.commands.music.Search[7]}`)
                        .setColor(colors.PERSO)
                        .setTimestamp()
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                ]
            });

            queue.addTrack(res.tracks[Number(query.content) - 1]);
            if (!queue.playing) await queue.play();

        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[8].replace('{PREFIX}', prefix)}`)
                ]
            });
        });
    }
}