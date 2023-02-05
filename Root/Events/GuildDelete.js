const db = require('../../UtilityBotFinal/Root/Storage/db/manager')

module.exports = {
    name: "guildDelete",

    run: async (guild, client) => {
        await db.deleteGuild(guild.id);
    }
}