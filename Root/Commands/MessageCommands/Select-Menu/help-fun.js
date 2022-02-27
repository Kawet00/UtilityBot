const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: `help-fun`,
        aliases: [`h-f`],
        onlyUsers: ["509765051435974692", "691644619758370846"],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')
                var prefix = db.get(`prefix_${message.guild.id}`) || config.prefix;

                const embed =
                        new container.Discord.MessageEmbed()
                        .setColor(colors.PERSO)
                        .setDescription(`${lang.commands.helpa[24]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
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
                                        description: lang.commands.help.helpB[0].replace('{PREFIX}', prefix),
                                        value: 'Help8ball'
                                },
                                {
                                        label: 'BIRD',
                                        description: lang.commands.help.helpBi[0].replace('{PREFIX}', prefix),
                                        value: 'HelpBird'
                                },
                                {
                                        label: 'CAT',
                                        description: lang.commands.help.helpCat[0].replace('{PREFIX}', prefix),
                                        value: 'HelpCat'
                                },
                                {
                                        label: 'COLOR',
                                        description: lang.commands.help.helpCo[0].replace('{PREFIX}', prefix),
                                        value: 'HelpColor'
                                },
                                {
                                        label: 'DOG',
                                        description: lang.commands.help.helpDog[0].replace('{PREFIX}', prefix),
                                        value: 'HelpDog'
                                },
                                {
                                        label: 'FOX',
                                        description: lang.commands.help.helpFox[0].replace('{PREFIX}', prefix),
                                        value: 'HelpFox'
                                },
                                {
                                        label: 'FUN BIRD',
                                        description: lang.commands.help.helpFBI[0].replace('{PREFIX}', prefix),
                                        value: 'HelpFunBird'
                                },
                                {
                                        label: 'FUN CAT',
                                        description: lang.commands.help.helpFCat[0].replace('{PREFIX}', prefix),
                                        value: 'HelpFunCat'
                                },
                                {
                                        label: 'FUN DOG',
                                        description: lang.commands.help.helpFDog[0].replace('{PREFIX}', prefix),
                                        value: 'HelpFunDog'
                                },
                                {
                                        label: 'FUN FOX',
                                        description: lang.commands.help.helpFFox[0].replace('{PREFIX}', prefix),
                                        value: 'HelpFunFox'
                                },
                                {
                                        label: 'MEME',
                                        description: lang.commands.help.helpM[0].replace('{PREFIX}', prefix),
                                        value: 'HelpMeme',
                                },
                                {
                                        label: lang.commands.help.helpMo[2],
                                        description: lang.commands.help.helpMo[0].replace('{PREFIX}', prefix),
                                        value: 'HelpMo'
                                },
                                {
                                        label: lang.commands.help.helpPF[2],
                                        description: lang.commands.help.helpPF[0].replace('{PREFIX}', prefix),
                                        value: 'HelpPF'
                                },
                                {
                                        label: 'MESSAGE ANONYME',
                                        description: lang.commands.help.helpMsgA[0].replace('{PREFIX}', prefix),
                                        value: 'HelpMsgAnonyme'
                                },
                                {
                                        label: 'MESSAGE',
                                        description: lang.commands.help.helpMsg[0].replace('{PREFIX}', prefix),
                                        value: 'HelpMsg'
                                },
                                {
                                        label: 'RESPECT+',
                                        description: lang.commands.help.helpRe[0].replace('{PREFIX}', prefix),
                                        value: 'HelpRespect'
                                },
                                {
                                        label: 'SLAP',
                                        description: lang.commands.help.helpSlap[0].replace('{PREFIX}', prefix),
                                        value: 'HelpSlap'
                                },
                                {
                                        label: 'WANTED',
                                        description: lang.commands.help.helpWa[0].replace('{PREFIX}', prefix),
                                        value: 'HelpWanted'
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
        }
};