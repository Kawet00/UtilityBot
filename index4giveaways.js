const Discord = require('discord.js');
const client = new Discord.Client();
const {GiveawaysManager} = require("discord-giveaways");
const db = require('quic.db');

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
        exemptPermissions: ["Administrator"],
        embedColor: "#FF0000",
        reaction: `${emotes.autre.giveaway_1}`
    }
});