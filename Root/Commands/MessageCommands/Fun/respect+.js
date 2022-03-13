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
    }
}