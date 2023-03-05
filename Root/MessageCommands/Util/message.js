const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "message",
    aliases: ["msg"],
    cooldown: 10000,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        let msgUser = message.mentions.users.first();
        let messageBeingSent = args.join(" ").slice(22);
        if (!msgUser) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
        if (!messageBeingSent) return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.message[1]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })

        msgUser.send({
            embeds: [
                new EmbedBuilder()
                    .setAuthor({
                        name: message.author.tag, iconURL: message.author.displayAvatarURL({
                            dynamic: true
                        })
                    })
                    .setTimestamp()
                    .setColor(colors.PERSO)
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true,
                    }))
                    .setFooter(message.client.user.username, message.client.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .setTitle(`${emotes.blob.blob_w} ┇ ${lang.commands.util.message[2].replace('{USER}', message.author.tag)}`)
                    .setDescription(`\n${messageBeingSent}`)
            ]
        }).catch((err) => {
            console.log(err)
            message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.RED)
                        .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/R39FrwyZ7w)')}`)
                        .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                        .setTimestamp()
                ]
            });
        });

        await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle(lang.commands.util.message[3])
                    .setDescription(`${emotes.pepe.pepe_s} ┇ ${lang.commands.util.message[4].replace('{USER}', msgUser)}`)
                    .setAuthor(
                        {name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})}
                    )
                    .setThumbnail(msgUser.displayAvatarURL({dynamic: true}))
                    .setColor(colors.VERT)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            ]
        });
    }
};