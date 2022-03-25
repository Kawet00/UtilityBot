const colors = require('../../../Storage/json/colors.json')
const emotes = require('../../../Storage/json/emotes.json')
function dateFormat(date) {
    return new Date(date).toLocaleString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: "numeric",
        minute: "2-digit"
      })
    }
const db = require('quick.db');

module.exports = {

  name: "ban",
  description: "ban members",
  aliases: ['b'],
  userPermissions: ["BAN_MEMBERS"],
  clientPermissions: ["BAN_MEMBERS"],

  run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`))

        const user = message.guild.member(message.mentions.users.first());

        if (user) {

            const member = message.guild.member(user);

            if (user.user.bot) return message.channel.send(
                new container.Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.commands.mods.ban[0]}`)
                .setColor(colors.RED)
                .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
            ).then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
            if (user.hasPermission("MANAGE_MESSAGES")) return message.channel.send(
                new container.Discord.MessageEmbed()
                .setDescription(`${emotes.autre.banned} ┇ ${lang.commands.mods.ban[1]}`)
                .setColor(colors.RED)
                .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
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
                    .then(() => {
                        const embed = new container.Discord.MessageEmbed()
                            .setTitle(`${emotes.pepe.pepe_a} ┇ ${lang.commands.mods.ban[2]}`)
                            .setColor(colors.EPINGLE)
                            .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                            .setTimestamp()
                            .addField(lang.commands.mods.ban[3], member.author.tag, true)
                            .addField(lang.commands.modsa[0], message.author, true)
                            .addField(`\u200B`, '\u200B')
                            .addField(lang.commands.modsa[1], raison)
                            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
                        let logsC = db.get(`logs_${message.guild.id}`)
                        if (!logsC) return;
                        client.channels.cache.get(logsC).send(embed);
                        message.channel.send(
                            new Discord.MessageEmbed()
                            .setColor(colors.VERT)
                            .setDescription(`${emotes.autre.banned} ┇ ${user.user.tag} ${lang.commands.mods.ban[4]}`)
                            .setFooter(`© ${client.user.username}`, client.user.displayAvatarURL())
                            .setTimestamp()
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
                const embed = new container.Discord.MessageEmbed()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[3]}`)
                    .setColor(colors.RED)
                    .setFooter(`© ${client.user.username}`, client.user.avatarURL())
                    .setTimestamp()
                message.channel.send(embed).then(msg => {
                    msg.delete({
                        timeout: 10000
                    })
                });
            }
        } else {
            const embed = new container.Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.modsa[4]}`)
                .setColor(colors.EPINGLE)
                .setFooter(`©${client.user.username}`, client.user.avatarURL())
                .setTimestamp()
            message.channel.send(embed).then(msg => {
                msg.delete({
                    timeout: 10000
                })
            });
        };
    }
};