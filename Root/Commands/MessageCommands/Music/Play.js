const { QueryType } = require('discord-player')

module.exports = {
    name: "play",
    description: "play",
    aliases: ["p"],
    voiceChannel: true,

    run: async(client, message, args, container) => {
        if (!args[0]) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.RED)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`Write the name of the music you want to search. ❌`)
            ]
        });

        const res = await client.player.search(args.join(' '), {
            requestedBy: message.member,
            searchEngine: QueryType.AUTO
        });

        if (!res || !res.tracks.length) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.RED)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`No results found! ❌`)
            ]
        });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        try {
            if (!queue.connection) await queue.connect(message.member.voice.channel);
        } catch {
            await client.player.deleteQueue(message.guild.id);
            return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(container.Colors.EPINGLE)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                    .setDescription(`I can't join audio channel.`)
                ]
            });
        }

        await message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`Your ${res.playlist ? 'Your Playlist' : 'Your Track'} Loading... 🎧`)
            ]
        });

        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
}
}