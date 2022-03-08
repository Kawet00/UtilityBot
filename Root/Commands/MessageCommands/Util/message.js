const colors = require("../../../Storage/json/colors.json");
;
const db = require('quick.db');

module.exports = {
    name: "message",
    aliases: ["msg"],
    cooldown: 10000,

    run: async (client, message, args, container) => {

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        let msgUser = message.mentions.users.first();
        let messageBeingSent = args.join(" ").slice(22);
        if (!msgUser) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        });
        if (!messageBeingSent) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                .setColor(colors.EPINGLE)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
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
                    .setDescription(`\n${messageBeingSent}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                ]
            }).catch((err) => {
                message.reply({
                    embeds: [
                        new container.Discord.MessageEmbed()
                        .setColor(colors.RED)
                        .setDescription(`${container.Emotes.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/BT4SyHUM5z)')}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                         .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                        .setTimestamp()
                    ]
                });
            });

            await message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setTitle(lang.commands.util.message[3])
                    .setDescription(`${container.Emotes.pepe.pepe_s} ┇ ${lang.commands.util.message[4].replace('{USER}', msgUser)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
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
                    .setFooter(`© ${client.user.username}`,
                        client.user.avatarURL()
                    )
                ]
            });
        };
    },
};