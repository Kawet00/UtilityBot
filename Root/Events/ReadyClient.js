const chalk = require("chalk")
const Box = require("cli-box")
const package = require('../../package.json')
module.exports = {
    name: "ready",
    once: true,
    run: async (client) => {
        const activitys = [
            "Utility Bot v2.1",
            "by Elpistolero13",
            `${client.guilds.cache.size} servers`,
        ]

        const activity = activitys[Math.floor(Math.random() * activitys.length)];

        client.user.setActivity(activity, {
            type: `STREAMING`,
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        })
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

        console.log(chalk.bold.greenBright(ClientBox))
        console.log(chalk.bold.blueBright(CommandsBox))
    }
}