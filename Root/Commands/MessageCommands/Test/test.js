const ts = require('djs-tickets')

module.exports = {
    name: "test",
    description: "test",
    aliases: ["t"],
    voiceChannel: true,

    run: async(client, message, args, container) => {
        message.channel.send('test')
}
}