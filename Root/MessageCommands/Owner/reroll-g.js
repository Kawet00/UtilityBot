const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'reroll-g',
    aliases: ["r-g"],
    AllUserPermissions: ["Administrator"],

    run: async (client, message, args) => {
        let lang = client.langs.get(getLang(message.guild.id) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.owner.rerollG[0]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.owner.rerollG[1]} \`${args.join(' ')}\``)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() => {
                message.delete();
            }, 300)
        })

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.reply(lang.commands.owner.rerollG[2]);
            })
            .catch((e) => {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.RED)
                            .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.owner.rerollG[3]}`)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                }).then(() => {
                    setTimeout(() => {
                        message.delete();
                    }, 300)
                })
            });
    }
}