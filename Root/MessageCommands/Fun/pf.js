const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: 'pile-ou-face',
    description: 'flm',
    aliases: ["pf", "heads-or-tails", "h-o-t"],
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const pf = [
            `🥇 ┇ ${lang.commands.fun.pf[0]}`,
            `🥈 ┇ ${lang.commands.fun.pf[1]} `
        ]
        const pf2 = pf[Math.floor(Math.random() * pf.length)];
        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setDescription(pf2)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        })
    }
}