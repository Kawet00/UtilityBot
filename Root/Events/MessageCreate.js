const db = require('quick.db')
module.exports = {
    name: "messageCreate",
    run: async(message, client, container) => {
        if(message.channel.type == 'GUILD_TEXT' || !message.author.bot) {
        const Prefix = db.get(`prefix_${message.guild.id}`) ||container.Config.prefix
        const loadCommandOptions = require("../Structures/CommandOptions/loadCommandOptions")
        Prefix.forEach(prefix => {
            if (!message.content.toLowerCase().startsWith(prefix)) return;
            const cmdName = message.content.toString().toLowerCase().slice(prefix.length).trim().split(" ")[0]
            const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.messageCommands.aliases.get(cmdName))
            if (!command) return;
            if (command.allowBots) loadCommandOptions(client, message, command, false)
            else if (message.author.bot) return;
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false)
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false)
        })
    
    }
    }
}