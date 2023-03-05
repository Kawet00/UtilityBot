const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: "anonymous-message",
    aliases: ["msg-a", "a-msg", "message-anonyme"],
    cooldown: 10000,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

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
                    .setTimestamp()
                    .setColor(colors.PERSO)
                    .setThumbnail("https://comparatif-vpn.fr/wp-content/uploads/2018/04/Navigation-prive%CC%81e-anonyme-1280x720.jpg")
                    .setFooter({
                        text: `© ${client.user.username}`,
                        iconURL: message.client.user.displayAvatarURL({dynamic: true})
                    })
                    .setTitle(`${emotes.blob.blob_w} ┇ ${lang.commands.util.messageA[0]}`)
                    .setDescription(`${messageBeingSent}`)
            ]
        })
            .catch((err) => {
                message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(colors.RED)
                            .setDescription(`${emotes.autre.attention} ┇ ${lang.commands.util.messageA[1].replace('[contact]', '[contact the support](https://discord.gg/R39FrwyZ7w)')}`)
                            .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                    ]
                });
                console.log(err)
            })
            .then(() => {
                message.member.send('test')
            })
    }
};
