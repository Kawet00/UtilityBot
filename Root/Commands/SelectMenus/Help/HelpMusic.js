const db = require('quick.db')
const Discord = require('discord.js')
const emotes = require('../../../Storage/json/emotes.json')
const colors = require('../../../Storage/json/colors.json')
const config = require('../../../Storage/json/Config.json')

module.exports = {
  name: "Music",
  run: async (client, interaction) => {
    var prefix = db.get(`prefix_${interaction.guild.id}`)
    if (prefix == null) prefix = config.prefix;
    let lang = client.langs.get(db.get(`lang_${interaction.guild.id}`) || 'en')

    try {
    interaction.user.send({
      embeds: [
        new Discord.MessageEmbed()
        .setColor(colors.PERSO)
        .setTitle(`❓ ┇ ${lang.commands.help.music[0]}`)
        .setDescription(lang.commands.helpa[4].replace('{PREFIX}', prefix))
        .setFooter({
          text: `© ${client.user.username}`,
          iconURL: client.user.displayAvatarURL()
        })
        .setTimestamp()
        .addFields({
          name: `${emotes.blob.blob_p} ┇ BACK`,
          value: lang.commands.help.music[2].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.blob.blob_p} ┇ CLEAR`,
          value: lang.commands.help.music[3].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.blob.blob_p} ┇ FILTER`,
          value: lang.commands.help.music[4].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.blob.blob_p} ┇ LOOP`,
          value: lang.commands.help.music[5].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.blob.blob_p} ┇ NOW PLAYING`,
          value: lang.commands.help.music[6].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ PAUSE`,
          value: lang.commands.help.music[7].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ PLAY`,
          value: lang.commands.help.music[8].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ QUEUE`,
          value: lang.commands.help.music[9].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ RESUME`,
          value: lang.commands.help.music[10].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ SAVE`,
          value: lang.commands.help.music[11].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ SEARCH`,
          value: lang.commands.help.music[12].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ SKIP`,
          value: lang.commands.help.music[13].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ STOP`,
          value: lang.commands.help.music[14].replace("{PREFIX}", prefix),
          inline: true,
        }, {
          name: `${emotes.autre.cool_pika} ┇ VOLUME`,
          value: lang.commands.help.music[15].replace("{PREFIX}", prefix) + `\n\n[${lang.commandsa[0]}](https://clh-c.com/)`,
          inline: true,
        })
      ]
    }).then(() => {
      interaction.reply({
        content: lang.commands.help.success[0],
        ephemeral: true
})
    })
  } catch {
          interaction.reply(`Please active your DMs.`)
  }
  }
}