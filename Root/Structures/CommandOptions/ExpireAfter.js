const {bold} = require("chalk");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');
const ms = require("ms");

module.exports = async (client, message, Command, IsInteraction, InteractionType) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.expireAfter) return true;
    if (isNaN(Command.expireAfter)) {
        console.log(bold.yellow(`[ERROR] Invalid input detected in ExpireAfter option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    let user;
    if (IsInteraction) user = message.user
    else user = message.author
    const Time = client.expireAfter.get(`${Command.name}_${InteractionType}`) ?? Date.now()

    if (Math.floor(Date.now() - Time) < Command.expireAfter) return true;
    else {
        if (Command.returnErrors == false || Command.returnExpireAfterError == false) return false;
        else {
            const errorEmbed = new EmbedBuilder()
                .setAuthor({
                    name: user.tag,
                    iconURL: user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setTimestamp()
                .setColor("#FF0000")
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.ExpireAfter[0]}`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})

            message.reply({
                embeds: [errorEmbed],
                allowedMentions: {
                    repliedUser: false
                }
            })
            return false;
        }
    }
}