const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help-music`,
        aliases: [`h-mu`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                try {

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
                        .addOptions([
                                {
                                        label: 'BACK',
                                        description: lang.commands.help.helpBk[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpBack'
                                }, { 
                                        label: 'CLEAR LIST',
                                        description: lang.commands.help.helpCll[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpClear'
                                },
                                {
                                        label: 'FILTER',
                                        description: lang.commands.help.helpFl[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFilter'
                                },
                                {
                                        label: 'LOOP',
                                        description: lang.commands.help.helpLp[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpLoop'
                                },
                                {
                                        label: 'NOW PLAYING',
                                        description: lang.commands.help.helpNp[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpNowPlaying'
                                },
                                {
                                        label: 'PAUSE',
                                        description: lang.commands.help.helpPause[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPause'
                                },
                                {
                                        label: 'PLAY',
                                        description: lang.commands.help.helpPl[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPlay'
                                },
                                {
                                        label: 'QUEUE',
                                        description: lang.commands.help.helpQueue[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpQueue'
                                },
                                {
                                        label: 'RESUME',
                                        description: lang.commands.help.helpRes[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpResume'
                                },
                                {
                                        label: 'SAVE',
                                        description: lang.commands.help.helpSave[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSave'
                                },
                                {
                                        label: 'SEARCH',
                                        description: lang.commands.help.helpSch[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSearch'
                                },
                                {
                                        label: 'SKIP',
                                        description: lang.commands.help.helpSk[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSkip',
                                },
                                {
                                        label: 'STOP',
                                        description: lang.commands.help.helpStop[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpStop'
                                },
                                {
                                        label: 'VOLUME',
                                        description: lang.commands.help.helpVol[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpVolume'
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
                    .addField('Nom de la commande', 'Help Music')
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