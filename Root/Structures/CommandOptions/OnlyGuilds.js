const {bold} = require("chalk");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.onlyGuilds) return true;
    if (!Array.isArray(Command.onlyGuilds)) {
        console.log(bold.yellow(`[ERROR] Invalid input detected in AllClientPermissions option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    if (!message.guild) {
        console.log(bold.blue(`[WARN] Guild object not found in OnlyChannels option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    let GuildNames = []

    if (Command.onlyGuilds.some(Id => Id == message.guild.id)) return true;
    else {
        Command.onlyGuilds.forEach(Id => {
            GuildNames.push(client.guilds.cache.get(Id).name)
        })

        if (Command.returnErrors == false || Command.returnOnlyGuildsError == false) return false;
        else {
            const errorEmbed = new EmbedBuilder()
                .setAuthor({
                    name: message.member.user.tag,
                    iconURL: message.member.user.displayAvatarURL({
                        dynamic: true
                    })
                })
                .setColor(colors.EPINGLE)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyGuild[0]}`)
                .addFields(
                    {name: lang.cmdOptions.OnlyGuild[1], value: `•${onlyGuilds.join("\n•")}`}
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