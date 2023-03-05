const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "queue",
    description: "queue",
    aliases: ["q"],
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.AnyM[0]}`)
            ]
        });

        if (!queue.tracks[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.music.Queue[0]}`)
            ]
        });

        const embed = new EmbedBuilder();

        embed.setColor(colors.PERSO);
        embed.setThumbnail(message.guild.iconURL({size: 2048, dynamic: true}));
        embed.setTitle(`${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Queue[1]}`);

        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (${lang.commands.music.Queue[2]} <@${track.requestedBy.id}>)`);

        const songs = queue.tracks.length;
        const nextSongs = songs > 5 ? `${lang.commands.music.Queue[3]} **${songs - 5}** ${lang.commands.music.Queue[4]}` : `${lang.commands.music.Queue[5].replace('{SONGS}', songs)}`;

        embed.setDescription(`${lang.commands.music.Queue[6]} \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

        embed.setTimestamp();
        embed.setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

        message.reply({
            embeds: [embed]
        });
    }
}