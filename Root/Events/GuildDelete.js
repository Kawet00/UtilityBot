const {deleteGuild} = require('../Storage/db/manager')

module.exports = {
    name: "guildDelete",

    run: async (guild, client) => {
        await deleteGuild(guild.id);
    }
}