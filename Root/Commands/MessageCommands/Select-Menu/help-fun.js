const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)

module.exports = {
        name: `help-fun`,
        aliases: [`h-f`],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                try {
                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://eternode.ga/)`)
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
                                        label: '8BALL',
                                        description: lang.commands.help.helpB[0].replace('{PREFIX}', container.Prefix),
                                        value: 'Help8ball'
                                },
                                {
                                        label: 'BIRD',
                                        description: lang.commands.help.helpBi[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpBird'
                                },
                                {
                                        label: 'CAT',
                                        description: lang.commands.help.helpCat[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpCat'
                                },
                                {
                                        label: 'COLOR',
                                        description: lang.commands.help.helpCo[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpColor'
                                },
                                {
                                        label: 'DOG',
                                        description: lang.commands.help.helpDog[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpDog'
                                },
                                {
                                        label: 'FOX',
                                        description: lang.commands.help.helpFox[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFox'
                                },
                                {
                                        label: 'PANDA',
                                        description: lang.commands.help.helpPanda[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPanda'
                                },/*
                                {
                                        label: 'FUN BIRD',
                                        description: lang.commands.help.helpFBI[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFunBird'
                                },
                                {
                                        label: 'FUN CAT',
                                        description: lang.commands.help.helpFCat[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFunCat'
                                },
                                {
                                        label: 'FUN DOG',
                                        description: lang.commands.help.helpFDog[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFunDog'
                                },
                                {
                                        label: 'FUN FOX',
                                        description: lang.commands.help.helpFFox[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFunFox'
                                },*/
                                {
                                        label: 'MEME',
                                        description: lang.commands.help.helpM[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpMeme',
                                },
                                {
                                        label: lang.commands.help.helpMo[2],
                                        description: lang.commands.help.helpMo[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpMo'
                                },
                                {
                                        label: lang.commands.help.helpPF[2],
                                        description: lang.commands.help.helpPF[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpPF'
                                },
                                {
                                        label: 'MESSAGE ANONYME',
                                        description: lang.commands.help.helpMsgA[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpMsgAnonyme'
                                },
                                {
                                        label: 'MESSAGE',
                                        description: lang.commands.help.helpMsg[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpMsg'
                                },
                                {
                                        label: 'RESPECT+',
                                        description: lang.commands.help.helpRe[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpRespect'
                                },
                                {
                                        label: 'SLAP',
                                        description: lang.commands.help.helpSlap[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpSlap'
                                },
                                {
                                        label: 'WANTED',
                                        description: lang.commands.help.helpWa[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpWanted'
                                },
                                {
                                        label: 'GIPHY',
                                        description: lang.commands.help.helpGif[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpGiphy'
                                },
                                {
                                        label: 'RPS',
                                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpRps'
                                },
                                {
                                        label: 'QUICK CLICK',
                                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpQC'
                                },
                                {
                                        label: 'FIGHT',
                                        description: lang.commands.help.helpFight[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpFight'
                                },
                                {
                                        label: 'GUESS THE NUMBER',
                                        description: lang.commands.help.helpGuessTheNumber[0].replace('{PREFIX}', container.Prefix),
                                        value: 'HelpGTN'
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
                    .addField('Nom de la commande', 'Help Fun')
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