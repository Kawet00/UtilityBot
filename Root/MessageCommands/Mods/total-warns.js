const {getLang, getWarns} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');


module.exports = {
    name: "total-warns",
    description: "Check a users warnings",
    aliases: ["t-w"],
    AllUserPermissions: ["ManageMessages"],

    run: async (client, message, args) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const user = message.mentions.users.first() || message.guild.members.cache.get(args[1]) || message.author;


        let warnings = await getWarns(message.guild.id, user.id);

        if (warnings === null) warnings = 0;

        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.EPINGLE)
                    .setDescription(`${emotes.pepe.pepe_a} ┇ **${user.username}** ${lang.commands.mods.totalW[0].replace('{WARNINGS}', warnings)}`)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
        setTimeout(() => {
            message.delete();
        }, 300)

    }
}