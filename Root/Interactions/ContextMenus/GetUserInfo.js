const {ApplicationCommandType, EmbedBuilder} = require("discord.js");
const {getLang} = require('../../Storage/db/manager');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const moment = require('moment');
require(`moment-duration-format`);

module.exports = {
    name: "UserInfo",
    type: ApplicationCommandType.User,

    run: async (client, interaction) => {
        let lang = client.langs.get(await getLang(interaction.guild.id) || 'en')
        const targetId = interaction.targetId

        const status = {
            online: `✅ ${lang.commands.util.Ui[0]}`,
            idle: `🌙 ${lang.commands.util.Ui[1]}`,
            dnd: `❌ ${lang.commands.util.Ui[2]}`,
            offline: `😴 ${lang.commands.util.Ui[3]} / 👻 ${lang.commands.util.Ui[4]}`,
            streaming: `💻 ${lang.commands.util.Ui["6"]}`
        }
        const memberM = await client.guilds.cache.get(interaction.guild.id).members.cache.get(targetId);

        const filteredRoles = memberM.roles.cache.filter(role => role.id != interaction.guild.id)
        const listedRoles = filteredRoles.sort((a, b) => b.position - a.position).map(role => role.toString());

        const userFlags = memberM.user.flags.toArray()

        /*onst UserFlags = {
            HypeSquadOnlineHouse1: '4',
            HypeSquadOnlineHouse2: '3',
            HypeSquadOnlineHouse3: 'test',
            Partner: "2",
            ActiveDeveloper: '1'
        };*/


        interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(colors.PERSO)
                    .setAuthor({name: memberM.user.username, iconURL: memberM.user.displayAvatarURL({dynamic: true})})
                    .setThumbnail(memberM.user.displayAvatarURL({dynamic: true, size: 1024}))
                    .addFields(
                        {name: `**• ${lang.commands.util.Ui[17]}:**`, value: memberM.user.discriminator, inline: true},/*
                        {name: `**•🧑‍💻 ${lang.commands.util.Ui[5]}:**`, value: memberM.presence.activities[0].name, inline: true},*/
                        {name: `**• Status:**`, value: `${status[memberM.presence?.status] || `🚫 ${lang.commands.util.Ui[4]}`}`, inline: true},
                        {name: `**•🕵️‍♀️ ${lang.commands.util.Ui[18]}:**`, value: `${memberM.nickname || `🚫 ${lang.commands.util.Ui[7]}`}`, inline: true},
                        {name: `**•🧔 ${lang.commands.util.Ui[13]}:**`, value: `${listedRoles ? listedRoles.join(', ') : `🚫 ${lang.commands.util.Ui[14]}`}`, inline: true},
                        {name: `**•🆔 ID:**`, value: `${memberM.id}`, inline: true},
                        {name: `**•🤖 Bot:**`, value: `${memberM.bot ? `🤖 ${lang.commands.util.Ui[8]}` : `👤 ${lang.commands.util.Ui[9]}`}`, inline: true},
                        {name: `**•👨‍💻 ${lang.commands.util.Ui[10]}:**`, value: `${`🚫 ${lang.commands.util.Ui[11]}` || memberM.presence.activities[0].name}`, inline: true},
                        {name: `**•👋 ${lang.commands.util.Ui[12]}:**`, value: `${moment(memberM.joinedAt).format(`DD/MM/YYYY`)}`, inline: true},
                        {name: `**•👋 ${lang.commands.util.Ui[12]}:**`, value: `${moment(memberM.createdAt).format(`DD/MM/YYYY`)}`, inline: true},
                        {name: `**• ${lang.commands.util.Ui[15]}:**`, value: `• ${userFlags.join(`\n• `) || `🚫 ${lang.commands.util.Ui[16]}`}`, inline: true}
                    )
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
            ]
        });
    }
}
