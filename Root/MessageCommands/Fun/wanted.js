const AmeClient = require('amethyste-api');
const {AME_API} = require('../../Storage/json/Config.json');
const AmeAPI = new AmeClient(AME_API);
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const {EmbedBuilder, AttachmentBuilder} = require('discord.js');

module.exports = {
    name: "wanted",
    aliases: [],
    cooldown: 10000,

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        let User = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase().includes() === args.join(' ').toLocaleLowerCase()) ||
            message.member;
        let m = await message.reply(lang.commands.fun.wanted[0]);
        const buffer = await AmeAPI.generate("wanted", {
            url: User.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        })

        const attachment = new AttachmentBuilder(buffer, "wanted.png");

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.RED)
                    .setDescription(emotes.pepe.pepe_ar)
                    .setImage("attachment://wanted.png")
            ], files: [attachment]
        }).then(() => {
            m.delete()
        })
    }
}