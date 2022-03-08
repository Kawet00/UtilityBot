const { QueryType } = require('discord-player')
const db = require('quick.db');

module.exports = {
    name: "play",
    description: "play",
    aliases: ["p"],
    voiceChannel: true,

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.RED)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[0]}`)
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
                .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[1]}`)
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
                    .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Play[2]}`)
                ]
            });
        }

        await message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Play[3]} ${res.playlist ? lang.commands.music.Play[4]: lang.commands.music.Play[5]} ${lang.commands.music.Play[6]} `)
            ]
        });

        const dbVol = db.get(`vol_${message.guild.id}`)
        if(dbVol) {
            queue.setVolume(dbVol)
        }
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

        if (!queue.playing) await queue.play();
}
}