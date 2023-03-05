const {QueueRepeatMode} = require('discord-player')
const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "loop",
    description: "loop",
    aliases: ["lp"],
    voiceChannel: true,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');
        let prefix = await getPrefix(message.guild.id)
        const queue = client.player.getQueue(message.guild.id);


        if (!queue || !queue.playing) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
                    .setColor(colors.RED)
                    .setFooter({
                        text: `© ${client.user.username}`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        });

        if (args[0] === 'queue') {
            if (queue.repeatMode === 1) return message.reply({
                embeds: [

                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Loop[0].replace('{PREFIX}', prefix)}`)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .setColor(colors.RED)
                ]
            })

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF);

            return message.reply({
                embeds: [

                    new EmbedBuilder()
                        .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? `${emotes.pepe.pepe_n} ┇ ${lang.commands.music.Loop[1]}` : `${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Loop[2]}`}**, ${lang.commands.music.Loop[3]}` : `${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', prefix)}`)
                        .setColor(success ? colors.VERT : colors.RED)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                ]
            });
        } else {
            if (queue.repeatMode === 2) return message.reply({
                embeds: [

                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.commands.music.Loop[4].replace('{PREFIX}', prefix)}`)
                        .setColor(colors.RED)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                ]
            });

            const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);

            return message.reply({
                embeds: [

                    new EmbedBuilder()
                        .setDescription(success ? `Loop Mode: **${queue.repeatMode === 0 ? `${emotes.pepe.pepe_n} ┇ ${lang.commands.music.Loop[1]}` : `${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.Loop[2]}`}**, ${lang.commands.music.Loop[5].replace('{PREFIX}', prefix)}` : `${emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', prefix)}`)
                        .setColor(success ? colors.VERT : colors.RED)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                ]
            });
        }
    }
};