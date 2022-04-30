const { GuildSettings } = require('../Storage/db/Models')

module.exports = {
  name: "interactionCreate",
  run: async (interaction, client, container) => {
    const guildData = await GuildSettings.findOne({
        GuildId: interaction.guild.id
    })
    const lang = client.langs.get(guildData?.Lang)

    if(interaction.customId !== 'reactionRoles') return;
    await interaction.deferReply({
      ephemeral: true
    })

    const roleId = interaction.values[0]
    const memberRoles = interaction.member.roles
    const role = interaction.guild.roles.cache.get(roleId)

    const hasRole = memberRoles.cache.has(roleId)

    if (hasRole) {
      memberRoles.remove(roleId);
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(colors.VERT)
          .setDescription(`${emotes.pepe.pepe_ok}  ${lang.events.ReactionRoles[0].replace('{RNAME}', role.name)}`)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
        ],
        ephemeral: true
      })
    } else {
      memberRoles.add(roleId);
      interaction.reply({
        embeds: [
          new Discord.MessageEmbed()
          .setColor(colors.VERT)
          .setDescription(`${emotes.pepe.pepe_ok}  ${lang.events.ReactionRoles[1].replace('{RNAME}', role.name)}`)
          .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
          .setTimestamp()
        ],
        ephemeral: true
      })
    }
  }
}