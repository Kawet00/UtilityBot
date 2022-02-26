const db = require('quick.db')
module.exports = {
    name: "en",
    run: async(client, interaction, container) => {
        const Lang = db.get(`lang_${interaction.guild.id}`)
        if(db == 'en') {
            interaction.reply('test')
        } else if(db !== 'en'){
        db.set(`lang_${interaction.guild.id}`, 'en')
        interaction.reply("This is an example selectmenu.")
        }
    }
}