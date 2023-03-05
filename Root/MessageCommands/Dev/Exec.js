const {exec} = require("child_process")
const {ButtonBuilder, ActionRowBuilder} = require("discord.js");

module.exports = {
    name: 'exec',
    ownerOnly: true,
    run: async (client, message, args) => {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('evalbtn')
                    .setLabel('Delete Output')
                    .setStyle('DANGER')
            )
        let lola = args.join(" ")
        if (!lola) return message.channel.send("Please provide what to execute in the terminal!")
        exec(`${lola}`, (error, stdout) => {
            let response = (error || stdout)
            if (error) {
                console.log(`Tien un erreur`, error)
                message.channel.send({
                    content: `\`\`\`js\n${error.message}\n\`\`\``,
                    components: [row]
                })
            } else {
                console.log(`Voici un Exec réaliser :`, response)
                message.channel.send({
                    content: `\`\`\`js\n${response}\n\`\`\``,
                    components: [row]
                })
            }
        })
    }
}