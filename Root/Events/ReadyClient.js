const chalk = require("chalk")
const Box = require("cli-box")
const package = require('../../package.json')
const config = require('../Storage/Vault/Config')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')
const Discord = require('discord.js')

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {

        const activitys = [
            "by Elpistolero13",
        "the v2.2.0",
        "on www.utilitybot.ga",
        "u!help",
        /*`on ${client.guilds.cache.size} servers`*/
        ]

        
        
    setInterval(function() {
        const activity = activitys[Math.floor(Math.random() * activitys.length)];

        client.user.setActivity(activity, {
            type: `STREAMING`,
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        })
    }, 5000)
/*
setInterval(() => {
    api.postStats({
        serverCount: client.guilds.cache.size,
    })
}, 1800000)
app.post('/dblwebhook', webhook.middleware(), async(req, res) => {
    try {
        const user = await client.users.fetch(req.vote.user);
        db.set(`votes_${user.id}`)
        db.add(`votes_${user.id}`, 1)
        let vote = db.get(`votes_${user.id}`)
        user.send(
            new Discord.MessageEmbed()
            .setColor(colors.PERSO)
            .setTitle('🥰 ┇ MERCI !')
            .setDescription('Merci d\'avoir voter pour \`Utility Bot\` !')
            .addFields({
                name: 'Vous avez',
                value: `${vote} vote(s)`
            })
        );
        setTimeout(() => {
            user.send(
                new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setTitle('VOTE')
                .setDescription('Vous pouvez [revoter pour moi](https://top.gg/bot/739863718547947652/vote) sur top.gg :) !')
            )
        }, 4, 32e+7)
    } catch (error) {
        console.error(error);
    }
})
console.log('✅ Api top.gg mise ! ✅');*/

        const ClientBox = new Box({
            w: Math.floor(client.user.tag.length + 27),
            h: 7,
            stringify: false,
            marks: {
                nw: '╭',
                n: '─',
                ne: '╮',
                e: '│',
                se: '╯',
                s: '─',
                sw: '╰',
                w: '│'
            },
            hAlign: 'left',
        }, `C L I E N T   I N F O R M A T I O N

Client Details    ::    ${client.user.tag}
Guilds Count      ::    ${client.guilds.cache.size}
User Count        ::    ${client.users.cache.size}
NodeJS Version    ::    ${process.version}
Bot Version       ::    ${package["version"]}
`).stringify()

const CommandsBox = new Box({
    w: Math.floor(`Initiating ${client.commands.aliases.size} messageCommands Aliases.`.length + 37),
    h: 8,
    stringify: false,
    marks: {
        nw: '╭',
        n: '─',
        ne: '╮',
        e: '│',
        se: '╯',
        s: '─',
        sw: '╰',
        w: '│'
    },
    hAlign: "left",
}, `C O M M A N D S   I N F O R M A T I O N

MessageCommands            ::    Initiating ${client.commands.messageCommands.size} messageCommands.
MessageCommands Aliases    ::    Initiating ${client.commands.aliases.size} messageCommands Aliases.
SlashCommands              ::    Initiating ${client.commands.slashCommands.size} slashCommands.
SelectMenus                ::    Initiating ${client.commands.selectMenus.size} selectMenus.
ContextMenus               ::    Initiating ${client.commands.contextMenus.size} contextMenus.
ButtonCommands             ::    Initiating ${client.commands.buttonCommands.size} buttonCommands.
Client Events              ::    Initiating ${client.events.size} events.
`).stringify()

const InfosClientBox = new Box({
    w: Math.floor(`${client.users.cache.size} users.`.length + 37),
    h: 8,
    stringify: false,
    marks: {
        nw: '╭',
        n: '─',
        ne: '╮',
        e: '│',
        se: '╯',
        s: '─',
        sw: '╰',
        w: '│'
    },
    hAlign: "left",
}, `R A P P E L S   C L I E N T   I N F O R M A T I O N S

Client Details    ::    ${client.user.tag}
Guilds Count      ::    ${client.guilds.cache.size}
User Count        ::    ${client.users.cache.size}
NodeJS Version    ::    ${process.version}
Bot Version       ::    ${package["version"]}
`).stringify()

const InfosCommandsBox = new Box({
    w: Math.floor(`Initiating ${client.commands.aliases.size} messageCommands Aliases.`.length + 37),
    h: 8,
    stringify: false,
    marks: {
        nw: '╭',
        n: '─',
        ne: '╮',
        e: '│',
        se: '╯',
        s: '─',
        sw: '╰',
        w: '│'
    },
    hAlign: "left",
}, `R A P P E L   C O M M A N D S   I N F O R M A T I O N

MessageCommands            ::    Initiating ${client.commands.messageCommands.size} messageCommands.
MessageCommands Aliases    ::    Initiating ${client.commands.aliases.size} messageCommands Aliases.
SlashCommands              ::    Initiating ${client.commands.slashCommands.size} slashCommands.
SelectMenus                ::    Initiating ${client.commands.selectMenus.size} selectMenus.
ContextMenus               ::    Initiating ${client.commands.contextMenus.size} contextMenus.
ButtonCommands             ::    Initiating ${client.commands.buttonCommands.size} buttonCommands.
Client Events              ::    Initiating ${client.events.size} events.
`).stringify()

        console.log(chalk.bold.greenBright(ClientBox))
        console.log(chalk.bold.cyanBright(CommandsBox))
        /*client.guilds.cache.get(config.supporGuild).channels.cache.get('790955338479304776').send({
            content: `@here`,
            embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setDescription(`${emotes.pepe.pepe_a} ┇ RESTART`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })*/
        setTimeout(() => {
            client.guilds.cache.get(config.supporGuild).channels.cache.get('790955338479304776').send({
                content: `@here`,
                embeds: [
                    new Discord.MessageEmbed()
                    .setColor(colors.PERSO)
                    .setDescription(`${emotes.pepe.pepe_a} ┇ RESTART`)
                    .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                    .setTimestamp()
                ]
            })
        }, 43200000)
    }
}