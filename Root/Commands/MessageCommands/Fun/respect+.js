const AmeClient = require('amethyste-api');
const { AME_API } = require('../../../Storage/Vault/Config')
const AmeAPI = new AmeClient(AME_API);

const db = require('quick.db');

module.exports = {
    name: "respect+",
    aliases: ["r+"],
    cooldown: 10000,

    async run(client, message, args, container) {

        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.member;

        let m = await message.reply(lang.commands.fun.respect[0]);

        let buffer = await AmeAPI.generate("missionpassed", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        });
        
        const attachment = new container.Discord.MessageAttachment(buffer, "respect.png");

        message.channel.send({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(container.Colors.VERT)
                .setDescription(container.Emotes.pepe.pepe_s)
                .setImage("attachment://respect.png")
            ],
            files: [attachment]
        }).then(() => {
            m.delete()
        });
        setTimeout(() =>{
            message.delete();
          }, 300)
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Respect +')
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