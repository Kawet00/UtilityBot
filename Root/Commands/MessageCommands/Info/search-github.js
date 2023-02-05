const request = require('node-superfetch');
const moment = require('moment');
const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'search-github',
    aliasses: ['s-git'],
    
    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

      const author = args[0]
      const repository = args[1]
        if (!author || !repository ) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${lang.commands.util.SGit[0]} `)
                .setTimestamp()
                .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setColor(colors.EPINGLE)
            ]
        });
            const { body } = await request
                .get(`https://api.github.com/repos/${author}/${repository}`)
                .set({ Authorization: `token ${container.Config.GITHUB_API_KEY}` });
            const embed = new container.Discord.MessageEmbed()
                .setColor(colors.NOIR)
                .setAuthor({ name: 'GitHub', iconURL: 'https://i.imgur.com/e4HunUm.png', url: 'https://github.com/'})
                .setTitle(body.full_name)
                .setTimestamp()
                .setURL(body.html_url)
                .setDescription(body.description ? shorten(body.description) : lang.commands.util.SGit[1])
                .setThumbnail(body.owner.avatar_url)
                .addField('❯ Stars', formatNumber(body.stargazers_count), true)
                .addField('❯ Forks', formatNumber(body.forks), true)
                .addField('❯ Issues', formatNumber(body.open_issues), true)
                .addField('❯ Language', body.language || '???', true)
                .addField('❯ Creation Date', moment.utc(body.created_at).format('MM/DD/YYYY h:mm A'), true)
                .addField('❯ Modification Date', moment.utc(body.updated_at).format('MM/DD/YYYY h:mm A'), true)
                .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() });

            return message.channel.send({ embeds: [embed]})
        
} catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Search Github')
            .addField('Erreur', `\`\`\`${e}\`\`\``)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setColor(colors.PERSO)
        ]
    })
    message.reply({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${lang.commands.problem[0]}`)
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
        ]
    })
    console.log(e)
}
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