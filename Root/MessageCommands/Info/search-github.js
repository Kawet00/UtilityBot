const request = require('node-superfetch');
const moment = require('moment');
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const {GITHUB_API_KEY} = require('../../Storage/json/Config.json')

module.exports = {
    name: 'search-github',
    aliasses: ['s-git'],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const author = args[0]
        const repository = args[1]
        if (!author || !repository) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${lang.commands.util.SGit[0]} `)
                    .setTimestamp()
                    .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setColor(colors.EPINGLE)
            ]
        });
        const {body} = await request
            .get(`https://api.github.com/repos/${author}/${repository}`)
            .set({Authorization: `token ${GITHUB_API_KEY}`});
        const embed = new EmbedBuilder()
            .setColor(colors.NOIR)
            .setAuthor({
                name: 'GitHub',
                iconURL: 'https://i.imgur.com/e4HunUm.png',
                url: `https://github.com/${author}/${repository}`
            })
            .setTitle(body.full_name)
            .setTimestamp()
            .setURL(body.html_url)
            .setDescription(body.description ? shorten(body.description) : lang.commands.util.SGit[1])
            .setThumbnail(body.owner.avatar_url)
            .addFields(
                {name: '❯ Stars', value: formatNumber(body.stargazers_count), inline: true},
                {name: '❯ Forks', value: formatNumber(body.forks), inline: true},
                {name: '❯ Issues', value: formatNumber(body.open_issues), inline: true},
                {name: '❯ Language', value: body.language || '???', inline: true},
                {name: '❯ Creation Date', value: moment.utc(body.created_at).format('MM/DD/YYYY h:mm A'), inline: true},
                {name: '❯ Modification Date', inline: moment.utc(body.updated_at).format('MM/DD/YYYY h:mm A'), inline: true}
    )
            .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()});

        return message.channel.send({embeds: [embed]})
    }
};

function shorten(text, maxLen = 2000) {
    return text.length > maxLen ? `${text.substr(0, maxLen - 3)}...` : text;
}

function formatNumber(number, minimumFractionDigits = 0) {
    return Number.parseFloat(number).toLocaleString(undefined, {
        minimumFractionDigits,
        maximumFractionDigits: 2
    });
}