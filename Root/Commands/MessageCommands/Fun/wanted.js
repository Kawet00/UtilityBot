const AmeClient = require('amethyste-api');
const config = require('../../../Storage/Vault/Config')
const AmeAPI = new AmeClient(config.AME_API);

const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: "wanted",
    aliases: [],
    cooldown: 10000,

    async run(client, message, args, container) {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) ||
            message.member;
        let m = await message.reply(lang.commands.fun.wanted[0]);
         const buffer = await AmeAPI.generate("wanted", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        })

        const attachment = new container.Discord.MessageAttachment(buffer, "wanted.png");

message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.cream)
                .setDescription(container.Emotes.pepe.pepe_ar)
                .setImage("attachment://wanted.png")
            ], files: [attachment]
        }).then(() => {
            m.delete()
        })
    }
}