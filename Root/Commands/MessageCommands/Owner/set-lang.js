const db = require('quick.db')
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'set-lang',
    aliase: ["s-la"],
    onlyUsers: ["509765051435974692", "691644619758370846"],
    userPermissions: ["ADMINISTRATOR"],
    cooldown: 1800000,

    run: async (client, message, args, container) => {
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

        let Lang = args[0];

        if (!Lang) return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${lang.commands.owner.setL[0]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        })

        if (Lang !== "fr" && Lang !== "en" && Lang !== "FR" && Lang !== "EN" && Lang !== "Fr" && Lang !== "En" && Lang !== "fR" && Lang !=="eN") return message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .setDescription(`${lang.commands.owner.setL[1].replace('{ARGS}', args[0])}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        })

        if(Lang === "FR" == "fr")
        if(Lang === "fr" == "fr")
        if(Lang === "Fr" == "fr")
        if(Lang === "fR" == "fr")
        if(Lang === "EN" == "en")
        if(Lang === "fr" == "en")
        if(Lang === "En" == "en")
        if(Lang === "eN" == "en")

        await db.delete(`lang_${message.guild.id}`)
        await db.set(`lang_${message.guild.id}`, Lang)

        message.reply({
            embeds: [
            new container.Discord.MessageEmbed()
            .setColor(colors.EPINGLE)
            .addField(lang.commands.owner.setL[2], `${Lang}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
            .setTimestamp()
             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
            ]
        });
    }
}