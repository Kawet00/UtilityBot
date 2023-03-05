const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'all-filters',

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(`${emotes.autre.wumpus_dj} ┇ ${lang.commands.music.AllF[0]} `)
                    .addFields(
                        { name: 'Filters:', value: `\`bassboost\`\n\`bassboost_low\`\n\`bassboost_high\`\n\`8D\`\n\`vaporwave\`\n\`nightcore\`\n\`phaser\`\n\`tremolo\`\n\`vibrato\`\n\`reverse\`\n\`treble\`\n\`normalizer\`\n\`normalizer2\`\n\`surrounding\`\n\`pulsator\`\n\`subboost\`\n\`karaoke\`\n\`flanger\`\n\`gate\`\n\`haas\`\n\`mcompand\`\n\`mono\`\n\`mstlr\`\n\`mstrr\`\n\`compressor\`\n\`expander\`\n\`softlimiter\`\n\`chorus\`\n\`chorus2d\`\n\`chorus3d\`\n\`fadein\`\n\`dim\`\n\`earrape\`` }
                    )
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setThumbnail()
            ]
        })
    }
}