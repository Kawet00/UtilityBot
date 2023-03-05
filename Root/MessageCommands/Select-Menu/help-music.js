const {getLang, getPrefix} = require('../../Storage/db/manager');
const {EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');

module.exports = {
    name: `help-music`,
    aliases: [`h-mu`],
    cooldown: 300000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')
        let prefix = await getPrefix(message.guild.id)

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
                .addOptions([
                    {
                        label: 'BACK',
                        description: lang.commands.help.helpBk[0].replace('{PREFIX}', prefix),
                        value: 'HelpBack'
                    }, {
                        label: 'CLEAR LIST',
                        description: lang.commands.help.helpCll[0].replace('{PREFIX}', prefix),
                        value: 'HelpClear'
                    },
                    {
                        label: 'FILTER',
                        description: lang.commands.help.helpFl[0].replace('{PREFIX}', prefix),
                        value: 'HelpFilter'
                    },
                    {
                        label: 'LOOP',
                        description: lang.commands.help.helpLp[0].replace('{PREFIX}', prefix),
                        value: 'HelpLoop'
                    },
                    {
                        label: 'NOW PLAYING',
                        description: lang.commands.help.helpNp[0].replace('{PREFIX}', prefix),
                        value: 'HelpNowPlaying'
                    },
                    {
                        label: 'PAUSE',
                        description: lang.commands.help.helpPause[0].replace('{PREFIX}', prefix),
                        value: 'HelpPause'
                    },
                    {
                        label: 'PLAY',
                        description: lang.commands.help.helpPl[0].replace('{PREFIX}', prefix),
                        value: 'HelpPlay'
                    },
                    {
                        label: 'QUEUE',
                        description: lang.commands.help.helpQueue[0].replace('{PREFIX}', prefix),
                        value: 'HelpQueue'
                    },
                    {
                        label: 'RESUME',
                        description: lang.commands.help.helpRes[0].replace('{PREFIX}', prefix),
                        value: 'HelpResume'
                    },
                    {
                        label: 'SAVE',
                        description: lang.commands.help.helpSave[0].replace('{PREFIX}', prefix),
                        value: 'HelpSave'
                    },
                    {
                        label: 'SEARCH',
                        description: lang.commands.help.helpSch[0].replace('{PREFIX}', prefix),
                        value: 'HelpSearch'
                    },
                    {
                        label: 'SKIP',
                        description: lang.commands.help.helpSk[0].replace('{PREFIX}', prefix),
                        value: 'HelpSkip',
                    },
                    {
                        label: 'STOP',
                        description: lang.commands.help.helpStop[0].replace('{PREFIX}', prefix),
                        value: 'HelpStop'
                    },
                    {
                        label: 'VOLUME',
                        description: lang.commands.help.helpVol[0].replace('{PREFIX}', prefix),
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
    }
};