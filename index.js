(async () => {
    const Discord = require("discord.js");
    const {
        Player
    } = require('discord-player');
    const config = require("./Root/Storage/Vault/Config");
    const path = __dirname;
    const db = require('quick.db');
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
    client.commands.aliases = new Discord.Collection();
    client.commands.contextMenus = new Discord.Collection();
    client.commands.slashCommands = new Discord.Collection();
    client.commands.buttonCommands = new Discord.Collection();
    client.commands.selectMenus = new Discord.Collection();
    client.player = new Player(client, config.opt.discordPlayer);

    const Handler = require(`${path}/Root/Structures/Handlers/Handler`);
    await Handler.loadMessageCommands(client, path);
    await Handler.loadEvents(client, path);
    await Handler.loadLangs(client, path);
    await client.login(config.token);
    await Handler.loadSlashCommands(client, path);
    await Handler.loadContextMenus(client, path);
    await Handler.loadButtonCommands(client, path);
    await Handler.loadSelectMenus(client, path);
    await Handler.loadServer(client);

    const player = client.player

    player.on('error', (queue, error) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.mscOptions.error[0].replace('{PREFIX}', config.prefix)}`)
                .setColor(colors.RED)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
        console.log(error);
    });

    player.on('connectionError', (queue, error) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.mscOptions.connectionError[0].replace('{PREFIX}', config.prefix)}`)
                .setColor(colors.RED)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
        console.log(error);
    });

    player.on('trackStart', (queue, track) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        if (!config.opt.loopMessage && queue.repeatMode !== 0) return;
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.autre.wumpus_dj} ┇ ${lang.mscOptions.trackStart[0].replace('{TITLE}', track.title).replace('{CHANNEL}', queue.connection.channel.name)}`)
                .setColor(colors.VERT)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
    });

    player.on('trackAdd', (queue, track) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_ok} ┇ ${lang.mscOptions.trackAdd[0].replace('{TITLE}', track.title)}`)
                .setColor(colors.VERT)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
    });

    player.on('botDisconnect', (queue) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.blob.blob_w} ┇ ${lang.mscOptions.botDisconnect[0]}`)
                .setColor(colors.EPINGLE)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
    });

    player.on('channelEmpty', (queue) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.pepe.pepe_srx} ┇ ${lang.mscOptions.channelEmpty[0]}`)
                .setColor(colors.EPINGLE)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
    });

    player.on('queueEnd', (queue) => {
        const lang = client.langs.get(db.get(`lang_${queue.guild.id}`) || 'en')
        queue.metadata.send({
            embeds: [
                new Discord.MessageEmbed()
                .setDescription(`${emotes.autre.wumpus_dj} ┇ ${lang.mscOptions.queueEnd[0]}`)
                .setColor(colors.VERT)
                .setFooter({
                    text: `© ${client.user.username}`,
                    iconURL: client.user.displayAvatarURL()
                })
                .setTimestamp()
            ]
        });
    });
})()