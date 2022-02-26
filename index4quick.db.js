const fs = require('fs');

const Discord = require('discord.js');
const client = new Discord.Client();

const { token } = require('./Root/Storage/Vault/Config');

const { GiveawaysManager } = require("discord-giveaways");
;
if (!db.get("giveaways")) db.set("giveaways", []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    async getAllGiveaways() {
        return db.get("giveaways");
    }

    async saveGiveaway(messageID, giveawayData) {
        db.push("giveaways", giveawayData);
        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        const giveaways = db.get("giveaways");
        const newGiveawaysArray = giveaways.filter((giveaway) => giveaway.messageID !== messageID);
        newGiveawaysArray.push(giveawayData);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

    async deleteGiveaway(messageID) {
        const newGiveawaysArray = db.get("giveaways").filter((giveaway) => giveaway.messageID !== messageID);
        db.set("giveaways", newGiveawaysArray);
        return true;
    }

};

const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false,
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: `${emotes.autre.giveaway_1}`
    }
});

exports.client = client;
global.ROOT = {}
ROOT.path = __dirname;
ROOT.config = require(`${ROOT.path}/Root/Storage/Vault/Config`)
client.commands = new Discord.Collection();
client.langs = new Discord.Collection();
client.commands.normal = new Discord.Collection();
client.events = new Discord.Collection();
client.commands.normal.aliases = new Discord.Collection();
client.commands.buttons = new Discord.Collection();
client.commands.menus = new Discord.Collection();
client.commands.slash = new Discord.Collection();

const Handler = require(`${ROOT.path}/Root/Classes/Handlers/Handler`);
await Handler.loadCommands(client);
await Handler.loadEvents(client);
await client.login(ROOT.config.token);
await Handler.loadSlashCommands(client);
await Handler.loadLangs(client);
await Handler.loadButtonCommands(client);
await Handler.loadSelectMenuCommands(client);