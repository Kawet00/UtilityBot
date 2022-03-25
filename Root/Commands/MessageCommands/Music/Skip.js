const db = require('quick.db');

module.exports = {
  name: "skip",
  voiceChannel: true,

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
    try {
    
    const queue = client.player.getQueue(message.guild.id);
 
if (!queue || !queue.playing) return message.reply({
  embeds: [
    new container.Discord.MessageEmbed()
    .setColor(container.Colors.RED)
    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    .setDescription(`${container.Emotes.blob.blob_n} ┇ ${lang.commands.music.AnyM[0]}`)
  ]
});

const success = queue.skip();

return message.reply({
  embeds: [
    new container.Discord.MessageEmbed()
    .setColor(success ? container.Colors.VERT : container.Colors.RED)
    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
    .setTimestamp()
    .setDescription(success ? `${container.Emotes.pepe.pepe_ok} ┇ **${queue.current.title}**, ${lang.commands.music.Skip[0]}` : `${container.Emotes.pepe.pepe_ns} ┇ ${lang.commands.music.SomethW[0].replace('{PREFIX}', container.Prefix)}`)
  ]
});
} catch (e) {
    client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription('Petit problème avec un utilisateur.')
            .addField('Nom de la commande', 'Skip')
            .addField('Erreur', `\`\`\`${e}\`\`\``)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
            .setColor(colors.PERSO)
        ]
    })
    message.reply({
        embeds: [
            new container.Discord.MessageEmbed()
            .setDescription(`${lang.commands.problem[0]}`)
            .setColor(colors.EPINGLE)
            .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
            .setTimestamp()
        ]
    })
    console.log(e)
  }
  }
}