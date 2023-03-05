const {bold} = require("chalk");
const {EmbedBuilder} = require("discord.js");
const {getLang} = require('../../Storage/db/manager');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command, InteractionType) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.allClientPermissions) return true;
    if (!Array.isArray(Command.allClientPermissions)) {
        console.log(bold.yellow(`[ERROR] Invalid input detected in AllClientPermissions option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    if (!message.guild) {
        console.log(bold.blue(`[WARN] Guild object not found in AllClientPermissions option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    let MissingPermissions = []

    Command.allClientPermissions.forEach(Permission => {
        if (!message.guild.members.me.permissions.has(Permission)) MissingPermissions.push(Permission)
    })
    if (MissingPermissions.length == 0) return true;
    else {
        if (Command.returnErrors == false || Command.returnAllClientPermissionsError == false) return false;
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
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.ClientPerm[0]}`)
                .addFields(
                    {name: lang.cmdOptions.ClientPerm[1], value: `•${missing.join("\n•")}`}
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