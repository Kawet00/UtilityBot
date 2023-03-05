const yts = require("yt-search");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder,ButtonBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: 'ytstats',
    aliases: ["yts"],
    cooldown: 10000,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const channelName = args.join(" ");

        if (!channelName) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.EPINGLE)
                        .setDescription(`${lang.commands.util.YTS[0]}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ],
            });
        } else {
            const result = await yts(channelName);
            const channels = result.channels.slice(0, 1);
            channels.forEach(function (c) {
                const ytstatsEmbed = new EmbedBuilder()
                    .setColor(colors.RED)
                    .setThumbnail(c.image)
                    .setTitle("YouTube Stats")
                    .addFields(
                        {name: lang.commands.util.YTS[1], value: `${c.name}`, inline: false},
                        {name: lang.commands.util.YTS[2], value: `${c.videoCountLabel.replace('subscribers', lang.commands.util.YTS[6])}`, inline: false},/*
                        {name: lang.commands.util.YTS[3], value: `${c.videoCount.toLocaleString()}`, inline: false}*/
                    )
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()

                const row = new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setLabel(lang.commands.util.YTS[4])
                        .setStyle("Link")
                        .setURL(c.url)
                );

                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.PERSO)
                            .setDescription(lang.commands.util.YTS[5])
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ],
                }).then(async (s) => {
                    s.edit({
                        embeds: [ytstatsEmbed],
                        components: [row],
                    });
                });
            });
        }
    }

};