const request = require('node-superfetch');
const db = require('quick.db')

module.exports = {
    name: 'people-in-space',
    aliases: ['p-i-s', 'pis'],
    description: 'Responds with the people currently in space.',
    cooldown: 18000000,
    
    run: async (client, message, args, container) => {
        
      let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
      try {

            const { body } = await request.get('http://api.open-notify.org/astros.json');
            const crafts = {};
            for (const person of body.people) {
                if (crafts[person.craft]) crafts[person.craft].push(person.name);
                else crafts[person.craft] = [person.name];
            }
            const embed = new container.Discord.MessageEmbed()
                .setColor(container.Colors.PERSO)
                .setImage('https://i.imgur.com/m3ooNfl.jpg')
                .setFooter({ text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTitle(`${container.Emotes.pepe.pepe_w} ┇ ${lang.commands.util.Pis[0].replace('{NUMBER}', body.number)}`)
            for (const [craft, people] of Object.entries(crafts)) {
                embed.addField(`❯ ${craft} (${people.length})`, people.join('\n'), true);
            }
            return message.reply({ embeds: [embed] });

        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Peapople In Space')
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
};