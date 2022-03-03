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
            .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setTimestamp()
            .setDescription(`Please enter a valid song name. ❌`)
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
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
                .setDescription(`No search results found. ❌`)
            ]
        });

        const queue = await client.player.createQueue(message.guild, {
            metadata: message.channel
        });

        const embed = new container.Discord.MessageEmbed();

        embed.setColor('RED');
        embed.setTitle(`Searched Music: ${args.join(' ')}`);

        const maxTracks = res.tracks.slice(0, 10);

        embed.setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nChoose a song from **1** to **${maxTracks.length}** write send or write **cancel** and cancel selection.⬇️`);

        embed.setTimestamp();
        embed.setFooter({ text: 'Edited by Umut Bayraktar ❤️', iconURL: message.author.avatarURL({ dynamic: true })});

        message.reply({ embeds: [embed] });

        const collector = message.channel.createMessageCollector({
            time: 15000,
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

       collector.on('collect', async (query) => {
            if (query.content.toLowerCase() === 'cancel') return message.channel.send(`Call cancelled. ✅`) && collector.stop();

            const value = parseInt(query.content);

            if (!value || value <= 0 || value > maxTracks.length) return message.channel.send(`Error: select a song **1** to **${maxTracks.length}** and write send or type **cancel** and cancel selection. ❌`);

            collector.stop();

            try {
                if (!queue.connection) await queue.connect(message.member.voice.channel);
            } catch {
                await client.player.deleteQueue(message.guild.id);
                return message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(container.Colors)
                        .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                        .setTimestamp()
                        .setDescription(`I can't join audio channel. ❌`)
                    ]
                });
            }

            await message.channel.send(`Loading your music call. 🎧`);

            queue.addTrack(res.tracks[Number(query.content)-1]);
            if (!queue.playing) await queue.play();
           
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(container.Colors)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                    .setDescription(`Song search time expired ❌`)
                ]
            });
        });
      }
    }