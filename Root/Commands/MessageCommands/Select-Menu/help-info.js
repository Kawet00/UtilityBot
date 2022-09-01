const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const Statcord = require("statcord.js");

module.exports = {
        name: `help-info`,
        aliases: [`h-i`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                const statcord = new Statcord.Client({
                    client,
                    key: "statcord.com-yii75DBTXNPkQSQsLID6",
                    postCpuStatistics: false, /* Whether to post memory statistics or not, defaults to true */
                    postMemStatistics: false, /* Whether to post memory statistics or not, defaults to true */
                    postNetworkStatistics: false, /* Whether to post memory statistics or not, defaults to true */
                });
                try {
                        statcord.post()
                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://clh-c.com/)`)
                        .setFooter({
                                text: `© ${client.user.username}`,
                                iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()

                const row = new container.Discord.MessageActionRow().addComponents(
                        new container.Discord.MessageSelectMenu()
                        .setCustomId('Help')
                        .setPlaceholder(lang.commands.helpa[19])
                        .addOptions([{
                                        label: 'BOTINFO',
                                        description: lang.commands.help.helpBo[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpBotInfo'
                                },
                                {
                                        label: 'INVITE',
                                        description: lang.commands.help.helpI[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpInvite'
                                },
                                {
                                        label: 'PING',
                                        description: lang.commands.help.helpCat[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPing'
                                },
                                {
                                        label: lang.commands.help.info[1],
                                        description: lang.commands.help.helpSS[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpServerStats'
                                },
                                {
                                        label: 'UPTIME',
                                        description: lang.commands.help.helpUp[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpUptime'
                                },
                                {
                                        label: 'USERINFO',
                                        description: lang.commands.help.helpUI[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpUserInfo'
                                },
                                {
                                        label: 'GITHUB',
                                        description: lang.commands.help.helpGit[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelGithub'
                                },
                                {
                                        label: 'SEARCH GITHUB',
                                        description: lang.commands.help.helpSGit[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSearchGithub'
                                },
                                {
                                        label: 'CRYPTO PRICE',
                                        description: lang.commands.help.helpUI[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpCrypto'
                                },
                                {
                                        label: 'PEOPLE IN SPACE',
                                        description: lang.commands.help.helpPIS[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPis'
                                },
                                {
                                        label: 'YOUTUBE STATS',
                                        description: lang.commands.help.helpPIS[0].replace('{PREFIX}', container.Prefix),
                                        value: 'helpYTSTATS'
                                }
                        ]),
                )
                message.reply({
                        embeds: [embed],
                        components: [row],
                        allowedMentions: {
                                repliedUser: false
                        }
                })
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Help Info')
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
          
    statcord.on("autopost-start", () => {
        console.log("Started autopost");
    });
    
    statcord.on("post", status => {
        if (!status) console.log("Successful post");
        else console.error(status);
    });
        }
};