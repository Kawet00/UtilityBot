const ts = require('djs-tickets')

module.exports = {
    name: "test",
    description: "test",
    aliases: ["t"],
    ownerOnly: true,

    run: async(client, message, args, container) => {
        const channelid = message.mention.channel.first()
        ts.setup()
}
}