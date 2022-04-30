var { Schema, model } = require('mongoose');

const ModelSettings = new Schema({
    GuildID: { type: String, required: true, unique: true },
    prefix: { type: String, required: true, unique: false },
    lang: { type: String, required: true, unique: false },
});

const GuildSettings = model("GuildSettings", ModelSettings);



const ModelTicket = new Schema({
    GuildID: String,
    Roles: Array
});

const GuildTicket = model("GuildTicket", ModelTicket);



const ModelReactionRole = new Schema({
    GuildID: String,
    TranscriptID: String,
    MemberID: [String],
    TicketID: String,
    ChannelID: String,
    Closed: Boolean,
    ClosedBy: String,
    Locked: Boolean,
    Type: String
});

const GuildReactionRole = model("GuildReactionRole", ModelReactionRole);



const ActiveCommandsRole = new Schema({
    GuildID: String,
    Name: String,
    Active: Boolean
});

const ActiveCommands = model("ActiveCommands", ActiveCommandsRole);



exports.GuildTicket = GuildTicket;
exports.GuildSettings = GuildSettings;
exports.GuildReactionRole = GuildReactionRole;
exports.ActiveCommands = ActiveCommands;