const db = require('quick.db')
module.exports = {
    name: "fr",
    run: async(client, interaction, container) => {
        const Lang = db.get(`lang_${interaction.guild.id}`)
        if(db == 'fr') {
            interaction.reply('test')
        } else if(db !== 'fr'){
        db.set(`lang_${interaction.guild.id}`, 'fr')
        interaction.reply("This is an example selectmenu.")
        }
    }
}