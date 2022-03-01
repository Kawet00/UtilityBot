const emotes = require(`../../../Storage/json/emotes.json`)
const db = require('quick.db')
const colors = require(`../../../Storage/json/colors.json`)
const config = require('../../../Storage/Vault/Config')

module.exports = {
        name: `help-music`,
        aliases: [`h-mu`],
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
                        .addOptions([
                                {
                                        label: 'CLEAR',
                                        description: lang.commands.help.helpCl[0].replace('{PREFIX}', prefix),
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
                                        description: lang.commands.help.helpSp[0].replace('{PREFIX}', prefix),
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