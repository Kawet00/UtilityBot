const db = require('quick.db')
const colors = require('../../../../Storage/json/colors.json')

module.exports = {
    name: 'help-fun-dog',
    aliases: ["h-f-d"],

    onlyUsers: ["509765051435974692", "691644619758370846"],
    run: async (client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../../Classes/Handlers/Handler`);
          await Handler.loadLangs(client);
        var prefix = db.get(`prefix_${message.guild.id}` || container.Config.prefix)
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`));

        message.reply({
            embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle(lang.commands.help.helpFDog[0].replace('{PREFIX}', prefix))
                .setDescription(lang.commands.helpa[4])
                .addFields({
                    name: lang.commands.helpa[5],
                    value: lang.commands.help.helpFDog[1]
                }, {
                    name: lang.commands.helpa[6],
                    value: `\`${prefix}fun-dog\``,
                    inline: true
                }, {
                    name: lang.commands.helpa[7],
                    value: `\`${prefix}f-d\``,
                    inline: true
                },  {
                    name: lang.commands.helpa[2],
                    value: lang.commands.helpa[1]
                }, {
                    name: lang.commands.helpa[9],
                    value: "`Fun`"
                }, {
                    name: "Cooldown",
                    value: "10s"
                }, {
                    name: lang.commands.helpa[10],
                    value: lang.commands.helpa[11] + `\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                })
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.avatarURL()})
                .setTimestamp()
            ]
        })
    }
}