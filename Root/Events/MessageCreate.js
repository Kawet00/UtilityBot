const db = require('quick.db')
module.exports = {
    name: "messageCreate",
    run: async(message, client, container) => {
        let Prefix = db.get(`prefix_${message.guild.id}`) || "<your prefix>" //Where we have "<your prefix>" you need tu put your default prefix

        const loadCommandOptions = require("../Structures/CommandOptions/loadCommandOptions")

            if (!message.content.toLowerCase().startsWith(Prefix)) return;

            const cmdName = message.content.toString().toLowerCase().slice(Prefix.length).trim().split(" ")[0]
            const command = client.commands.messageCommands.get(cmdName) ?? client.commands.messageCommands.get(client.commands.aliases.get(cmdName))

            if (!command) return;
            if (command.allowBots) loadCommandOptions(client, message, command, false)
            else if (message.author.bot || message.channel.type == 'DM') return;
            else if (command.guildOnly == false) loadCommandOptions(client, message, command, false)
            else if (!message.guild) return;
            else loadCommandOptions(client, message, command, false)
    }
    }