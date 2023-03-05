const {bold} = require("chalk");
const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const {developers} = require('../../Storage/json/Config.json');
const emotes = require('../../Storage/json/emotes.json');
const colors = require('../../Storage/json/colors.json');

module.exports = async (client, message, Command, InteractionType) => {
    const lang = client.langs.get(await getLang(message.guild.id) || 'en')
    if (!Command.onlyChannels) return true;
    if (!message.guild) {
        console.log(bold.blue(`[WARN] Guild object not found in OnlyChannels option of ${Command.name} of ${InteractionType}.`))
        return true;
    }
    Command.onlyChannels.forEach(Id => {
        if (!message.guild.channels.cache.get(Id)) console.log(bold.yellow(`[WARN] Invalid Channel Id [${Id}] provided in OnlyChannels option of ${Command.name} of ${InteractionType}.`))
        return true;
    })

    if (Command.onlyChannels.some(Id => message.channel.id == Id)) return true;
    else {
        if (Command.returnErrors == false || Command.returnOnlyChannelsError == false) return false;
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
                .setDescription(`${emotes.blob.blob_n} ┇ ${lang.cmdOptions.OnlyChannels[0]}`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                .addFields(
                    {name: lang.cmdOptions.OnlyChannels[1], value: `•${onlyChannels.join("\n•")}`}
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