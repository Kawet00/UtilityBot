const request = require('node-superfetch');
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'people-in-space',
    aliases: ['p-i-s', 'pis'],
    description: 'Responds with the people currently in space.',
    cooldown: 18000000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        const {body} = await request.get('http://api.open-notify.org/astros.json');
        const crafts = {};
        for (const person of body.people) {
            if (crafts[person.craft]) crafts[person.craft].push(person.name);
            else crafts[person.craft] = [person.name];
        }
        const embed = new EmbedBuilder()
            .setColor(colors.PERSO)
            .setImage('https://i.imgur.com/m3ooNfl.jpg')
            .setFooter({text: `©️ ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
            .setTitle(`${emotes.pepe.pepe_w} ┇ ${lang.commands.util.Pis[0].replace('{NUMBER}', body.number)}`)
        for (const [craft, people] of Object.entries(crafts)) {
            embed.addFields(
                {name: `❯ ${craft} (${people.length})`, value: people.join('\n'), inline: true}
            );
        }
        return message.reply({embeds: [embed]});
    }
};