const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help-fun`,
    aliases: [`h-f`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')
        let prefix = await getPrefix(message.guild.id);

        const embed =
            new EmbedBuilder()
                .setColor(colors.PERSO)
                .setDescription(`${lang.commands.helpa[24]}`)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()


        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
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
                        label: 'PANDA',
                        description: lang.commands.help.helpPanda[0].replace('{PREFIX}', prefix),
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
                    },
                    {
                        label: 'GIPHY',
                        description: lang.commands.help.helpGif[0].replace('{PREFIX}', prefix),
                        value: 'HelpGiphy'
                    },
                    {
                        label: 'RPS',
                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', prefix),
                        value: 'HelpRps'
                    },
                    {
                        label: 'QUICK CLICK',
                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', prefix),
                        value: 'HelpQC'
                    },
                    {
                        label: 'FIGHT',
                        description: lang.commands.help.helpFight[0].replace('{PREFIX}', prefix),
                        value: 'HelpFight'
                    },
                    {
                        label: 'GUESS THE NUMBER',
                        description: lang.commands.help.helpGuessTheNumber[0].replace('{PREFIX}', prefix),
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
    }
};