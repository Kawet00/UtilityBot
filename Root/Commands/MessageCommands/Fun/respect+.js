const AmeClient = require('amethyste-api');
const config = require('../../../Storage/Vault/Config')
const AmeAPI = new AmeClient(config.AME_API);
const emotes = require('../../../Storage/json/emotes.json')
const db = require('quick.db');

module.exports = {
    name: "respect+",
    aliases: ["r+"],
    cooldown: 10000,
    onlyUsers: ["509765051435974692", "691644619758370846"],

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

        message.reply(container.Emotes.pepe.pepe_s)
        message.channel.send({
            files: [{
            attachment: buffer,
            name: "mission.png"
            }]
        }).then(() => {
            m.delete()
        });
    }
}