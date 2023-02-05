const colors = require("../../../Storage/json/colors.json");
;
const db = require('quick.db');

module.exports = {
    name: "message",
    aliases: ["msg"],
    cooldown: 10000,

    run: async (client, message, args, container) => {

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        try {

        let msgUser = message.mentions.users.first();
        let messageBeingSent = args.join(" ").slice(22);
        if (!msgUser) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[0]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        });
        if (!messageBeingSent) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[1]}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        })

        if (!message) {
            db.set(`inconvo_${message.author.id}_${msgUser.id}`, true);
        } else {
            msgUser.send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({
                        dynamic: true
                    })})
                    .setTimestamp()
                    .setColor(colors.PERSO)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true,
                    }))
                    .setFooter(message.client.user.username, message.client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle(`${container.Emotes.blob.blob_w} ┇ ${lang.commands.util.message[2].replace('{USER}', message.author.tag)}`)
                    .setDescription(`\n${messageBeingSent}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                ]
            }).catch((err) => {
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(colors.RED)
                        .setDescription(`${container.Emotes.autre.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/R39FrwyZ7w)')}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                    ]
                });
            });

            await message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setTitle(lang.commands.util.message[3])
                    .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.message[4].replace('{USER}', msgUser)}\n\n[${lang.commandsa[0]}](https://yorkhost.fr/)`)
                    .setAuthor(
{ name: message.author.tag, iconURL:
                        message.author.displayAvatarURL({
                            dynamic: true
                        })}
                    )
                    .setThumbnail(msgUser.displayAvatarURL({
                        dynamic: true
                    }))
                    .setColor(colors.VERT)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                ]
            });
        };
    } catch (e) {
        client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription('Petit problème avec un utilisateur.')
                .addField('Nom de la commande', 'Message')
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