const {bold} = require("chalk");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command, IsInteraction) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.onlyUsers) return true;
    let user;

    if (IsInteraction) user = message.user
    else user = message.author

    if (Command.onlyUsers.some(Id => user.id == Id)) return true;
    else {
        if (Command.returnErrors == false || Command.returnOnlyUsersError == false) return false;
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
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyUsers[0]}`)
                .addFields(
                    {name: lang.cmdOptions.OnlyUsers[1], value: `• ${onlyUsers.join("\n• ")}`}
                )

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