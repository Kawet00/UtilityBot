const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const Discord = require('discord.js')

module.exports = {
        name: `help-fun`,
        aliases: [`h-f`],
        onlyUsers: ["509765051435974692", "691644619758370846"],
        cooldown: 300000,

        run: async (client, message, args, container) => {
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

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
                                        label: 'Meme',
                                        description: lang.commands.helpa[20],
                                        value: 'HelpMeme',
                                },
                                {
                                        label: '8ball',
                                        description: lang.commands.helpa[21],
                                        value: 'Help8ball'
                                },
                                {
                                        label: 'Bird',
                                        description: lang.commands.helpa[22],
                                        value: 'HelpBird'
                                },
                                {
                                        label: 'Cat',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpCat'
                                },
                                {
                                        label: 'Color',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpColor'
                                },
                                {
                                        label: 'dog',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpDog'
                                },
                                {
                                        label: 'fox',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpFox'
                                },
                                {
                                        label: 'Fun Bird',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpFunBird'
                                },
                                {
                                        label: 'Fun Cat',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpFunCat'
                                },
                                {
                                        label: 'Fun Dog',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpFunDog'
                                },
                                {
                                        label: 'Fun Fox',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpFunFox'
                                },
                                {
                                        label: lang.commands.help.helpMo[3],
                                        description: lang.commands.helpa[23],
                                        value: 'HelpMo'
                                },
                                {
                                        label: lang.commands.help.helpPF[3],
                                        description: lang.commands.helpa[23],
                                        value: 'HelpPF'
                                },
                                {
                                        label: 'Respect+',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpRespect'
                                },
                                {
                                        label: 'Slap',
                                        description: lang.commands.helpa[23],
                                        value: 'HelpSlap'
                                },
                                {
                                        label: 'Wanted',
                                        description: lang.commands.helpa[23],
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