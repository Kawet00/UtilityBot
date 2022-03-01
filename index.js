(async () => {
const Discord = require("discord.js");
const { Player } = require('discord-player');
const config = require("./Root/Storage/Vault/Config");
const path = __dirname;
const emotes = require('./Root/Storage/json/emotes.json')
const colors = require('./Root/Storage/json/colors.json')
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_PRESENCES,
        Discord.Intents.FLAGS.DIRECT_MESSAGES,
        Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Discord.Intents.FLAGS.GUILD_WEBHOOKS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        Discord.Intents.FLAGS.GUILD_INVITES,
        Discord.Intents.FLAGS.GUILD_BANS
    ],
    partials: ["CHANNEL"]
});


exports.client = client;
exports.path = path;
exports.config = config;
exports.emotes = emotes;
exports.colors = colors;
client.commands = {};
client.events = new Discord.Collection();
client.langs = new Discord.Collection();
client.commands.messageCommands = new Discord.Collection();
client.commands.messageCommands.aliases = new Discord.Collection();
client.commands.contextMenus = new Discord.Collection();
client.commands.slashCommands = new Discord.Collection();
client.commands.buttonCommands = new Discord.Collection();
client.commands.selectMenus = new Discord.Collection();
client.player = new Player(client, config.opt.discordPlayer);
    
const Handler = require(`${path}/Root/Structures/Handlers/Handler`);
await Handler.loadMessageCommands(client, path);
await Handler.loadEvents(client);
await Handler.loadLangs(client);
await client.login(config.token);
await Handler.loadSlashCommands(client, path);
await Handler.loadContextMenus(client, path);
await Handler.loadButtonCommands(client, path);
await Handler.loadSelectMenus(client, path);


const player = client.player

player.on('error', (queue, error) => {
    console.log(`There was a problem with the song queue => ${error.message}`);
});

player.on('connectionError', (queue, error) => {
    console.log(error);
});

player.on('trackStart', (queue, track) => {
    if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(`🎵 Music started playing: **${track.title}** -> Channel: **${queue.connection.channel.name}** 🎧`);
});

player.on('trackAdd', (queue, track) => {
    queue.metadata.send(`**${track.title}** added to playlist. ✅`);
});

player.on('botDisconnect', (queue) => {
    queue.metadata.send('Someone from the audio channel Im connected to kicked me out, the whole playlist has been cleared! ❌');
});

player.on('channelEmpty', (queue) => {
    queue.metadata.send('I left the audio channel because there is no one on my audio channel. ❌');
});

player.on('queueEnd', (queue) => {
    queue.metadata.send('All play queue finished, I think you can listen to some more music. ✅');
});
})()