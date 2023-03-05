const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const moment = require(`moment`);
require(`moment-duration-format`);
/*const flags = {
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
};*/

module.exports = {
    name: `user-info`,
    description: `none`,
    aliases: ["u-i"],
    cooldown: 5000,

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        const status = {
            online: `✅ ${lang.commands.util.Ui[0]}`,
            idle: `🌙 ${lang.commands.util.Ui[1]}`,
            dnd: `❌ ${lang.commands.util.Ui[2]}`,
            offline: `😴 ${lang.commands.util.Ui[3]} / 👻 ${lang.commands.util.Ui[4]}`,
            streaming: `💻 ${lang.commands.util.Ui["6"]}`
        }
        const memberM = message.mentions.members.first() || message.member;

        const filteredRoles = memberM.roles.cache.filter(role => role.id != message.guild.id);
        const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.toString());

        const userFlags = message.author.flags.toArray()

        /*const UserFlags = {
            HypeSquadOnlineHouse1: '4',
            HypeSquadOnlineHouse2: '3',
            HypeSquadOnlineHouse3: 'test',
            Partner: "2",
            ActiveDeveloper: '1'
        };*/


        message.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setAuthor({name: memberM.user.username, iconURL: memberM.user.displayAvatarURL({dynamic: true})})
                    .setThumbnail(memberM.user.displayAvatarURL({dynamic: true, size: 1024}))
                    .addFields(
                        {name: `**• ${lang.commands.util.Ui[17]}:**`, value: memberM.user.discriminator, inline: true},/*
                        {name: `**•🧑‍💻 ${lang.commands.util.Ui[5]}:**`, value: memberM.presence.activities[0].name, inline: true},*/
                        {name: `**• Status:**`, value: `${status[memberM.presence?.status] || `🚫 ${lang.commands.util.Ui[4]}`}`, inline: true},
                        {name: `**•🕵️‍♀️ Nickname:**`, value: `${memberM.user.nickname || `🚫 ${lang.commands.util.Ui[7]}`}`, inline: true},
                        {name: `**•🆔 ID:**`, value: `${memberM.id}`, inline: true},
                        {name: `**•🤖 Bot:**`, value: `${memberM.bot ? `🤖 ${lang.commands.util.Ui[8]}` : `👤 ${lang.commands.util.Ui[9]}`}`, inline: true},
                        {name: `**•👨‍💻 ${lang.commands.util.Ui[10]}:**`, value: `${`🚫 ${lang.commands.util.Ui[11]}` || memberM.presence.activities[0].name}`, inline: true},
                        {name: `**•👋 ${lang.commands.util.Ui[12]}:**`, value: `${moment(memberM.joinedAt).format(`DD/MM/YYYY`)}`, inline: true},
                        {name: `**•👋 ${lang.commands.util.Ui[12]}:**`, value: `${moment(message.author.createdAt).format(`DD/MM/YYYY`)}`, inline: true},
                        {name: `**• ${lang.commands.util.Ui[15]}:**`, value: `• ${userFlags.join(`\n• `) || `🚫 ${lang.commands.util.Ui[16]}`}`, inline: true}
                    )
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                /*.addFields(
                {name: `**•🧔 ${lang.commands.util.Ui[13]}:**`, value: `${listedRoles ? listedRoles.join(', ') : `🚫 ${lang.commands.util.Ui[14]}`}`, inline: true}
                )*/
            ]
        });
    }
}