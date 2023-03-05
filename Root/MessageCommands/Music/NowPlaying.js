const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, ButtonBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
    voiceChannel: true,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        Object.assign(this)
        const queue = client.player.getQueue(message.guild.id);

        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
                    .setFooter({
                        text: `© ${client.user.username}`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        });

        const track = queue.current;

        const embed = new EmbedBuilder();

        const progress = queue.createProgressBar();

        embed.setColor(colors.PERSO);
        embed.setThumbnail(track.thumbnail);
        embed.setTitle(track.title)

        const methods = [lang.commands.music.NowP[0], 'track', lang.commands.music.NowP[1]];

        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == lang.commands.music.NowP[4] ? lang.commands.music.NowP[5] : track.duration;
        const filter = ["bassboost", "8d"]

        if (queue.getFiltersEnabled() !== filter) {
        }
        if (queue.getFiltersEnabled().length < 1) {
            embed.setDescription(`${emotes.autre.wumpus_dj} ┇ Volume **${queue.volume}%**\n${lang.commands.music.NowP[2]}  **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${lang.commands.music.NowP[7]} **${lang.commands.music.NowP[6]}**`);
        } else if (queue.getFiltersEnabled().length > 0) {
            embed.setDescription(`${emotes.autre.wumpus_dj} ┇ Volume **${queue.volume}%**\n${lang.commands.music.NowP[2]}  **${trackDuration}**\nLoop Mode **${methods[queue.repeatMode]}**\n${lang.commands.music.NowP[7]} **${queue.getFiltersEnabled()}**`);
        }


        embed.addFields(
            {name: '\u200B', value: '\u200B'},
            {name: `Track, (${timestamp.progress}%)`, value: progress}
        )
        embed.setTimestamp();
        embed.setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(lang.commands.music.NowP[3])
                .setCustomId('saveBtn')
                .setStyle('Success')
        )

        message.reply({
            embeds: [embed],
            components: [row]
        });
    }
};