const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'vote',
    description: 'vote',
    aliases: ["v"],
    cooldown: 20000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${emotes.autre.giveaway_1} ┇ ${lang.commands.util.Vote["0"]}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .addFields(
                        {name: 'TOP.GG', value: '[VOTE](https://top.gg/bot/739863718547947652/vote)'},
                        {name: 'WONDERBOTLIST.COM', value: '[VOTE](https://wonderbotlist.com/fr/bot/739863718547947652/vote)'},
                        {name: 'DISCORDBOTLIST.COM', value: '[VOTE](https://discordbotlist.com/bots/utility-bot-9218/upvote)'},
                        {name: 'DISCORDLABS.ORG', value: '[VOTE](https://bots.discordlabs.org/bot/739863718547947652/vote)'}
                    )
                    .setTimestamp()
            ]
        })
    },
};