const colors = require(`../../../Storage/json/colors.json`)
const moment = require(`moment`)
require(`moment-duration-format`)
const flags = {
    DISCORD_EMPLOYEE: `<:staffD:762264211610927114>`,
    DISCORD_PARTNER: `<:partenaireD:762264272976871454>`,
    BUGHUNTER_LEVEL_1: `<:BugHunter1:762264523956027394>`,
    BUGHUNTER_LEVEL_2: `<:BugHunter2:762264547746381834>`,
    HYPESQUAD_EVENTS: `<:hypesquad:762265025754300427>`,
    HOUSE_BRAVERY: `<:bravery:762263100648062976>`,
    HOUSE_BRILLIANCE: `<:brilliance:585763004495298575>`,
    HOUSE_BALANCE: `<:ballance:762264989104340992>`,
    EARLY_SUPPORTER: `Early Supporter`,
    TEAM_USER: `Team User`,
    SYSTEM: `<:support:762263870651498496>`,
    VERIFIED_BOT: `<:veriferBot:762262077749854220>`,
    VERIFIED_DEVELOPER: `<:verifierDev:762260880187719730>`,
    NITRO: `nitro`
};
const db = require(`quick.db`);

module.exports = {
        name: `user-info`,
        onlyUsers: ["509765051435974692", "691644619758370846"],
        description: `none`,
        aliases: ["u-i"],
        cooldown: 5000,

        run: async(client, message, args, container) => {
                
                let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en')

                const status = {
                    online: `✅${lang.commands.util.Ui[0]}`,
                    idle: `🌙${lang.commands.util.Ui[1]}`,
                    dnd: `❌${lang.commands.util.Ui[2]}`,
                    offline: `😴${lang.commands.util.Ui[3]} / 👻${lang.commands.util.Ui[4]}`,
                    streaming: `💻${lang.commands.util.Ui["6"]}`
                }
                const memberM = message.guild.member(message.mentions.users.first()) || message.member || message.author;
                const userFlags = memberM.user.flags.toArray();
          message.reply({
              embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setAuthor({ name: memberM.user.username, iconURL: memberM.user.displayAvatarURL({ dynamic: true })})
                .setThumbnail(memberM.user.displayAvatarURL({ dynamic: true, size: 1024 }))
                .addField(`**•🕵️‍♂️ ${lang.commands.util.Ui[5]}:**`, `${memberM.user.tag}`, true)
                .addField(`**• Status:**`, `${status[memberM.presence.status]}`, true)
                .addField(`**•🕵️‍♀️ Nickname:**`, `${memberM.nickname !== null ? `${memberM.nickname}` : `🚫 ${lang.commands.util.Ui[3]}`}`, true)
        .addField(`**•🆔 ID:**`, `${memberM.id}`, true)
        .addField(`**•🤖 Bot:**`, `${memberM.bot ? `🤖 ${lang.commands.util.Ui[8]}` : `👤 ${lang.commands.util.Ui[9]}`}`, true)
        .addField(`**•👨‍💻 ${lang.commands.util.Ui[10]}:**`, `${memberM.presence.game || `🚫 ${lang.commands.util.Ui[11]}`}`, true)
        .addField(`**•👋 ${lang.commands.util.Ui[12]}:**`, `${moment(message.member.joinedAt).format(`DD/MM/YYYY`)}`, true)
        .addField(`**•🧔 ${lang.commands.util.Ui[13]}:**`, `${memberM.roles.cache.filter(r => r.name !== "@everyone").map(roles => `${roles}`).join(", ") || `🚫 ${lang.commands.util.Ui[14]}`}`, true)
        .addField(`**• ${lang.commands.util.Ui[15]}:**`, userFlags.length ? userFlags.map(flag => flags[flag]).join(`, `) : `🚫 ${lang.commands.util.Ui[16]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`, true)
       .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
      .setTimestamp()
              ]
          });
    }
}