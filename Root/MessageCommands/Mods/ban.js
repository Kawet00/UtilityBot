const {getLang, getLogsChannel} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

function dateFormat(date) {
    return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
    })
}

module.exports = {
    name: "ban",
    description: "ban members",
    aliases: ['b'],
    AllUserPermissions: ["BanMembers"],
    AllClientPermissions: ["BanMembers"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const user = message.mentions.users.first();

        if (user) {

            const member = message.guild.users.cache.get(user);

            if (user.user.bot) return message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.ban[0]}`)
                            .setColor(colors.RED)
                            .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                            .setTimestamp()
                    ]
                }
            ).then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
            if (user.hasPermission("ManageMessages")) return message.channel.send({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`${emotes.autre.banned} ┇ ${lang.commands.mods.ban[1]}`)
                            .setColor(colors.RED)
                            .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                            .setTimestamp()
                    ]
                }
            ).then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });

            if (member) {
                let raison = args.slice(2).join(" ") || lang.commands.modsa[2]

                member
                    .ban({
                        reason: raison,
                    })
                    .then(async () => {
                        const embed = new EmbedBuilder()
                            .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.ban[2]}`)
                            .setColor(colors.EPINGLE)
                            .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                            .setTimestamp()
                            .addFields(
                                {name: lang.commands.mods.ban[3], value: `<@!${member.author.tag}>`, inline: true},
                                {name: lang.commands.modsa[0], value: `<@!${message.author.id}>`, inline: true},
                                {name: `\u200B`, value: '\u200B'},
                                {name: lang.commands.modsa[1], value: raison},
                                {name: `Date`, value: `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``}
                            )
                        let logsC = await getLogsChannel(message.guild.id)
                        if (logsC === null) return;
                        else client.channels.cache.get(logsC).send({embeds: [embed]});
                        message.channel.send({
                                embeds: [
                                    new EmbedBuilder()
                                        .setColor(colors.VERT)
                                        .setDescription(`${emotes.autre.banned} ┇ ${user.user.tag} ${lang.commands.mods.ban[4]}`)
                                        .setFooter(`© ${client.user.username}`, client.user.displayAvatarURL())
                                        .setTimestamp()
                                ]
                            }
                        )
                    })
                /*.catch(() => {
                                        const embed = new container.Discord.MessageEmbed()
                                            .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.ban[5]}`)
                                            .setColor(colors.RED)
                                            .setFooter(`©${client.user.username} `, client.user.avatarURL())
                                            .setTimestamp()
                                        message.channel.send(embed).then(msg => {
                                            msg.delete({
                                                timeout: 10000
                                            })
                                        });
                                    });*/
            } else {
                const embed = new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[3]}`)
                    .setColor(colors.RED)
                    .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                    .setTimestamp()
                message.channel.send({embeds: [embed]}).then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                });
            }
        } else {
            const embed = new EmbedBuilder()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[4]}`)
                .setColor(colors.EPINGLE)
                .setFooter(`©${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
            message.channel.send({embeds: [embed]}).then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
        }
    }
};