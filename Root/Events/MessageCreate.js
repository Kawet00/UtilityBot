const CommandOptionsVerifier = require("../Structures/CommandOptions/LoadCommandOptions");
const {getPrefix} = require('../Storage/db/manager');

module.exports = {
    name: "messageCreate",
    run: async (message, client) => {
        if (!message.guild || message.author.bot) return;
        const Prefix = await getPrefix(message.guild.id);
        if (!message.content.startsWith(Prefix)) return;
        const CommandName = message.content.toString().slice(Prefix.length).trim().split(" ")[0];
        const Command = client.messageCommands.get(CommandName) ?? client.messageCommands.get(client.messageCommands_Aliases.get(CommandName));
        if (!Command) return;
        let args = message.content.slice(Prefix.length).trim();
        if (args.toLowerCase().startsWith(CommandName)) args = args.slice(CommandName.length).trim().split(" ");

        if (Command.limitUses && !isNaN(Command.limitUses)) {
            const limitUsesCollection = client.limitCommandUses;
            let LimitedUsesCount = limitUsesCollection.get(`${Command.name}_MessageCommand`) ?? -1;
            limitUsesCollection.set(`${Command.name}_MessageCommand`, Math.floor(LimitedUsesCount + 1));
        }

        if (!CommandOptionsVerifier(client, message, Command, false, "MessageCommand")) return;

        if (Command.expireAfter && !isNaN(Command.expireAfter)) {
            const expireAfterCollection = client.expireAfter;
            if (!expireAfterCollection.get(`${Command.name}_MessageCommand`)) expireAfterCollection.set(`${Command.name}_MessageCommand`, Date.now());
        }

        if (Command.allowInDms) Command.run(client, message, args);
        else if (Command.allowBots) Command.run(client, message, args);
        else Command.run(client, message, args);
    }
}