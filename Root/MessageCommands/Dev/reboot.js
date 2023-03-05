const {token} = require('../../Storage/json/Config.json')

module.exports = {
    name: 'reboot',
    ownerOnly: true,

    run: async (client, message) => {
        message.channel.send({
            content: "Restarting..."
        })
            .then(() => {
                process.exit()
            })
    }
}