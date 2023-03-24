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
                    value: 'help8ball'
                },
                    {
                        label: 'BIRD',
                        description: lang.commands.help.helpBi[0].replace('{PREFIX}', prefix),
                        value: 'helpBird'
                    },
                    {
                        label: 'CAT',
                        description: lang.commands.help.helpCat[0].replace('{PREFIX}', prefix),
                        value: 'helpCat'
                    },
                    {
                        label: 'COLOR',
                        description: lang.commands.help.helpCo[0].replace('{PREFIX}', prefix),
                        value: 'helpColor'
                    },
                    {
                        label: 'DOG',
                        description: lang.commands.help.helpDog[0].replace('{PREFIX}', prefix),
                        value: 'helpDog'
                    },
                    {
                        label: 'FOX',
                        description: lang.commands.help.helpFox[0].replace('{PREFIX}', prefix),
                        value: 'helpFox'
                    },
                    {
                        label: 'PANDA',
                        description: lang.commands.help.helpPanda[0].replace('{PREFIX}', prefix),
                        value: 'helpPanda'
                    },
                    {
                        label: 'MEME',
                        description: lang.commands.help.helpM[0].replace('{PREFIX}', prefix),
                        value: 'helpMeme',
                    },
                    {
                        label: lang.commands.help.fun[1],
                        description: lang.commands.help.helpMo[0].replace('{PREFIX}', prefix),
                        value: 'helpMo'
                    },
                    {
                        label: lang.commands.help.fun[2],
                        description: lang.commands.help.helpPF[0].replace('{PREFIX}', prefix),
                        value: 'helpPF'
                    },
                    {
                        label: 'MESSAGE ANONYME',
                        description: lang.commands.help.helpMsgA[0].replace('{PREFIX}', prefix),
                        value: 'helpMsgAnonyme'
                    },
                    {
                        label: 'MESSAGE',
                        description: lang.commands.help.helpMsg[0].replace('{PREFIX}', prefix),
                        value: 'helpMsg'
                    },
                    {
                        label: 'RESPECT+',
                        description: lang.commands.help.helpRe[0].replace('{PREFIX}', prefix),
                        value: 'helpRespect'
                    },
                    {
                        label: 'SLAP',
                        description: lang.commands.help.helpSlap[0].replace('{PREFIX}', prefix),
                        value: 'helpSlap'
                    },
                    {
                        label: 'WANTED',
                        description: lang.commands.help.helpWa[0].replace('{PREFIX}', prefix),
                        value: 'helpWanted'
                    },
                    {
                        label: 'GIPHY',
                        description: lang.commands.help.helpGif[0].replace('{PREFIX}', prefix),
                        value: 'helpGiphy'
                    },
                    {
                        label: 'RPS',
                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', prefix),
                        value: 'helpRps'
                    },/*
                    {
                        label: 'QUICK CLICK',
                        description: lang.commands.help.helpRps[0].replace('{PREFIX}', prefix),
                        value: 'helpQC'
                    },*/
                    {
                        label: 'FIGHT',
                        description: lang.commands.help.helpFight[0].replace('{PREFIX}', prefix),
                        value: 'helpFight'
                    },/*
                    {
                        label: 'GUESS THE NUMBER',
                        description: lang.commands.help.helpGTN[0].replace('{PREFIX}', prefix),
                        value: 'helpGTN'
                    },*/
                    {
                        label: '2048',
                        description: lang.commands.help.help2048[0].replace('{PREFIX}', prefix),
                        value: 'help2048'
                    },
                    {
                        label: lang.commands.help.fun[31],
                        description: lang.commands.help.helpMineSweeper[0].replace('{PREFIX}', prefix),
                        value: 'helpMineSweeper'
                    },
                    {
                        label: "POKEMON",
                        description: lang.commands.help.helpPokemon[0].replace('{PREFIX}', prefix),
                        value: 'helpPokemon'
                    },
                    {
                        label: lang.commands.help.fun[31],
                        description: lang.commands.help.helpConnect4[0].replace('{PREFIX}', prefix),
                        value: 'helpConnect4'
                    },
                    {
                        label: lang.commands.help.fun[32],
                        description: lang.commands.help.helpPairs[0].replace('{PREFIX}', prefix),
                        value: 'helpPairs'
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