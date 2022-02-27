const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
    name: 'reroll-g',
    aliases: ["r-g"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermission: ["ADMINISTRATOR"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        if (!args[0]) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.rerollG[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.owner.rerollG[1]} \`${args.join(' ')}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
                })

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.reply(lang.commands.owner.rerollG[2]);
            })
            .catch((e) => {
                    message.reply({
                        embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(colors.RED)
                        .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.owner.rerollG[3]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                        .setTimestamp()
                        ]
                    })
            });

    }
}