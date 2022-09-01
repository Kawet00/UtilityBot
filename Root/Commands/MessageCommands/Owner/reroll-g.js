
const colors = require('../../../Storage/json/colors.json')
const db = require('quick.db')

module.exports = {
    name: 'reroll-g',
    aliases: ["r-g"],
    userPermission: ["ADMINISTRATOR"],

    run: async(client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        if (!args[0]) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.rerollG[0]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        let giveaway = client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.owner.rerollG[1]} \`${args.join(' ')}\`\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
                }).then(() => {
                    setTimeout(() =>{
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
                        new container.Discord.MessageEmbed()
                        .setColor(colors.RED)
                        .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.owner.rerollG[3]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                        ]
                    }).then(() => {
                        setTimeout(() =>{
                          message.delete();
                        }, 300)
                    })
            });

        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', ' Reroll Giveaways')
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
}