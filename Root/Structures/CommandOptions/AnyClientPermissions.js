const {bold} = require("chalk");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command, InteractionType) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.anyClientPermissions) return true;
    if (!Array.isArray(Command.anyClientPermissions)) {
        console.log(bold.yellow(`[ERROR] Invalid input detected in AnyClientPermissions option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    if (!message.guild) {
        console.log(bold.blue(`[WARN] Guild object not found in AnyClientPermissions option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    if (message.guild.members.me.permissions.toArray().some(I => Command.anyClientPermissions.some(i => i.toUpperCase() == I.toUpperCase()))) return true;
    else {
        if (Command.returnErrors == false || Command.returnAnyClientPermissionsError == false) return false;
        else {
            const errorEmbed = new EmbedBuilder()
            new EmbedBuilder()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({ dynamic: true })
                })
                .setColor(colors.EPINGLE)
                .setTimestamp()
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.cmdOptions.AnyClientPerm[0]}`)
                .addFields(
                    {name: lang.cmdOptions.AnyClientPerm[1], value: `•${command.anyClientPermission.join("\n•")}`}
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