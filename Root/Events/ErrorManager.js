const {EmbedBuilder} = require('discord.js');

module.exports = {
    name: "errorManager",
    isCustom: true,
    run: async (client) => {
        process.on('unhandledRejection', error => {
            console.log(error)
            client.channels.cache.get('799932188442886176').send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Nouvelle erreur\n\n\`\`\`${error}\`\`\``)
                        .setTimestamp()
                ]
            })
        })
        process.on('uncaughtException', error => {
            console.log(error)
            client.channels.cache.get('799932188442886176').send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Nouvelle erreur\n\n\`\`\`${error}\`\`\``)
                        .setTimestamp()
                ]
            })
        })
    }
}