const AmeClient = require('amethyste-api');
const config = require('../../../Storage/Vault/Config')
const AmeAPI = new AmeClient(config.AME_API);
const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: "wanted",
    aliases: [],
    cooldown: 10000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

    async run(client, message, args, Discord) {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`))

        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) ||
            message.member;
        let m = await message.reply(lang.commands.fun.wanted[0]);
         const buffer = await AmeAPI.generate("wanted", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        })

        const attachment = new Discord.MessageAttachment(buffer, "wanted.png");

message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.cream)
                .setDescription(emotes.pepe.pepe_ar)
                .setImage("attachment://wanted.png")
            ], files: [attachment]
        }).then(() => {
            m.delete()
        })
    }
}