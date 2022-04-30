const db = require("quick.db");

module.exports = {
  name: "crypto-price",
  description: "test",
  aliases: ["c-p"],

  run: async (client, message, args, container) => {

    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

    try {

      if (!args[0]) return message.channel.send({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.util.Crypto[0]} `)
          .setColor(container.Colors.RED)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      })

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${args[0]}`
      );
      const data = await response.json();

      if (!response) {
        message.channel.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.util.Crypto[1]} `)
            .setColor(container.Colors.EPINGLE)
            .setFooter({
              text: `© ${client.user.username}`,
              iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp()
          ]
        })
      } else {
        message.channel.send({
          embeds: [
            new container.Discord.MessageEmbed()
            .setColor(container.Colors.PERSO)
            .setFooter({
              text: `© ${client.user.username}`,
              iconURL: client.user.displayAvatarURL()
            })
            .setTimestamp()
            .setTitle(`${data.name}`)
            .addFields([{
              name: lang.commands.util.Crypto[2],
              value: `EUR: **${data.market_data.current_price.eur}** €\n USD: **${data.market_data.current_price.usd}** $`
            }])
          ]
        })
      }
    } catch (e) {
      client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription('Petit problème avec un utilisateur.')
          .addField('Nom de la commande', 'Crypto Prices')
          .addField('Erreur', `\`\`\`${e}\`\`\``)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
          .setColor(container.Colors.PERSO)
        ]
      })
      message.reply({
        embeds: [
          new container.Discord.MessageEmbed()
          .setDescription(`${lang.commands.problem[0]}`)
          .setColor(container.Colors.EPINGLE)
          .setFooter({
            text: `© ${client.user.username}`,
            iconURL: client.user.displayAvatarURL()
          })
          .setTimestamp()
        ]
      })
      console.log(e)
    }
  }
}