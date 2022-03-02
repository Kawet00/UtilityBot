module.exports = {
  name: 'all-filters',

  run: async(client, message, args, container) => {

       message.reply({
         embeds: [
          container.Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .setDescription('voici tout les filtres')
          .addField('Filters :', "`bassboost`\n`bassboost_low`\n`bassboost_high`\n`8D`\n`vaporwave`\n`nightcore`\n`phaser`\n`tremolo`\n`vibrato`\n`reverse`\n`treble`\n`normalizer`\n`normalizer2`\n`surrounding`\n`pulsator`\n`subboost`\n`karaoke`\n`flanger`\n`gate`\n`haas`\n`mcompand`\n`mono`\n`mstlr`\n`mstrr`\n`compressor`\n`expander`\n`softlimiter`\n`chorus`\n`chorus2d`\n`chorus3d`\n`fadein`\n`dim`\n`earrape`")
         ]
       })
  }
}