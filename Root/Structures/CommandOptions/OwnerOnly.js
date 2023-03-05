const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command, IsInteraction) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.ownerOnly) return true;
    let user;
    if (IsInteraction) user = message.user
    else user = message.author

    if (developers.some(Id => user.id == Id)) return false;
    else {
        if (Command.returnErrors == false || Command.returnOwnerOnlyError == false) return false;
        else {
            const errorEmbed = new EmbedBuilder()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .setDescription(`${emotes.pepe.pepe_n} ┇ ${lang.cmdOptions.OwnerOnly[0]}`)
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