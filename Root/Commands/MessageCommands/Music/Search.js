const { QueryType } = require('discord-player')
const db = require('quick.db');

module.exports = {
  name: "search",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

    if (!args[0]) return message.reply({
        embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.RED)
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Search[0]}`)
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
                .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.Search[1]}`)
            ]
        });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new container.Discord.MessageEmbed();

        embed.setColor(container.Colors.PERSO);
        embed.setTitle(`${container.Emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Search[2]} ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\n  ${lang.commands.music.Search[3].replace('{MAXT}', maxTracks.length)}`);

        embed.setTimestamp();
        embed.setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL()});

        message.reply({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_ok} ┇ ${lang.commands.music.Search[4]}`)
                .setColor(container.Colors.VERT)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        }) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send({
                embeds: [
                    new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[5].replace('{MAXT}', maxTracks.length)}`)
                .setColor(container.Colors.EPINGLE)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
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
                        new container.Discord.MessageEmbed()
                        .setColor(container.Colors)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                        .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[6]}`)
                    ]
                });
            }

            await message.channel.send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${container.Emotes.pepe.pepe_ok} ┇ ${lang.commands.music.Search[7]}`)
                    .setColor(container.Colors.PERSO)
                    .setTimestamp()
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                ]
            });

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(container.Colors)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                    .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.music.Search[8].replace('{PREFIX}', container.Prefix)}`)
                ]
            });
        });
      }
    }