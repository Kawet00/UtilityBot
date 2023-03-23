(async () => {
    const {Client, GatewayIntentBits, Partials, Collection} = require("discord.js"),
        config = require("./Root/Storage/json/Config.json"),
        DirPath = __dirname,
        {
            MessageCommandHandler,
            EventManager,
            ButtonCommandHandler,
            SelectMenuHandler,
            SlashCommandsHandler,
            ContextMenuHandler,
            ModalFormsHandler,
            LangsHandler
        } = require("./Root/Structures/Handlers/HandlersManager"),
        {Player} = require('discord-player'),
        emotes = require('./Root/Storage/json/emotes.json'),
        colors = require('./Root/Storage/json/colors.json'),
        client = new Client({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildPresences,
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.MessageContent,
                GatewayIntentBits.DirectMessageReactions,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildWebhooks,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildInvites,
                GatewayIntentBits.GuildBans
            ],
            partials: [Partials.Channel]
        }),
        { getLang, getPrefix } = require('./Root/Storage/db/manager'),
        { EmbedBuilder } = require('discord.js');

    exports.client = client;
    exports.rootPath = DirPath;

    client.limitCommandUses = new Collection();
    client.expireAfter = new Collection();
    client.messageCommands = new Collection();
    client.messageCommands_Aliases = new Collection();
    client.events = new Collection();
    client.slashCommands = new Collection();
    client.contextMenus = new Collection();
    client.selectMenus = new Collection();
    client.buttonCommands = new Collection();
    client.modalForms = new Collection();
    client.langs = new Collection();
    client.giveawaysManager = new Collection();
    client.player = new Player(client, config.opt.discordPlayer);

    const player = client.player

    player.events.on('error', async (queue, error) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.mscOptions.error[0].replace('{PREFIX}', await getPrefix(queue.guild.id))}`)
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

    player.events.on('playerError', async (queue, error) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.mscOptions.connectionError[0].replace('{PREFIX}', await getPrefix(queue.guild.id))}`)
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

    player.events.on('playerStart', async (queue, track) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
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

    player.events.on('audioTracksAdd', async (queue, track) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
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

    player.events.on('disconnect', async (queue) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
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

    player.events.on('emptyChannel', async (queue) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
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

    player.events.on('emptyQueue', async (queue) => {
        const lang = client.langs.get(await getLang(queue.guild.id) || 'en')
        queue.metadata.send({
            embeds: [
                new EmbedBuilder()
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

    await MessageCommandHandler(client, DirPath);
    await EventManager(client, DirPath);
    await ButtonCommandHandler(client, DirPath);
    await SelectMenuHandler(client, DirPath);
    await ModalFormsHandler(client, DirPath);
    await client.login(config.token);
    await SlashCommandsHandler(client, DirPath);
    await ContextMenuHandler(client, DirPath);
    await LangsHandler(client);
})();