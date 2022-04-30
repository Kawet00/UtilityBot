const chalk = require("chalk")
const Box = require("cli-box")
const package = require('../../package.json')
const config = require('../Storage/json/Config.json')
const colors = require('../Storage/json/colors.json')
const emotes = require('../Storage/json/emotes.json')
const Discord = require('discord.js')
const mongoose = require('mongoose')

module.exports = {
    name: "ready",
    once: true,

    run: async (client) => {

        const activitys = [
            "by Elpistolero13",
        "the v2.3.1",
        "on utilitybot.me",
        "u!help",
        `on ${client.guilds.cache.size} servers`
        ]

        
        
    setInterval(function() {
        const activity = activitys[Math.floor(Math.random() * activitys.length)];

        client.user.setActivity(activity, {
            type: `STREAMING`,
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        })
    }, 5000)

const connected = await mongoose.connect(config.MONGODB_GUILDS_URI)

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

const MongoDBBox = new Box({
    w: Math.floor(`Connecting to MongoDB`.length + 20),
    h: 3,
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
}, `M O N G O D B   C O N N E C T I O N

Connection                 ::    ${connected? '✅': '❌'}`).stringify()

        console.log(chalk.bold.magentaBright(ClientBox))
        console.log(chalk.bold.cyanBright(CommandsBox))
        console.log(chalk.bold.greenBright(MongoDBBox))
        client.guilds.cache.get(config.supporGuild).channels.cache.get('790955338479304776').send({
            content: `@here`,
            embeds: [
                new Discord.MessageEmbed()
                .setColor(colors.PERSO)
                .setDescription(`${emotes.pepe.pepe_a} ┇ BOT ON`)
                .setFooter({ text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL() })
                .setTimestamp()
            ]
        })
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