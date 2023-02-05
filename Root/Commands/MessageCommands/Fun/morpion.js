const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
    name: 'morpion',
    description: 'none',
    aliases: ["noughts-and-crosses", "n-a-c"],
    ignoreFile: true,

    run: async(client, message, args, container) => {
        if(db.get(`morpion`) === false) return;
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

        try {

        const emojis = {
            "1️⃣": "1",
            "2️⃣": "2",
            "3️⃣": "3",
            "4️⃣": "4",
            "5️⃣": "5",
            "6️⃣": "6",
            "7️⃣": "7",
            "8️⃣": "8",
            "9️⃣": "9",
        };

        message.reply({
            embeds: [new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.fun.morpion[0]} `)
                .setColor(colors.PERSO)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
            }).then(async(msg) => {
            msg.react("🗡️");
            let filter = (reaction, user) =>
                !user.bot && reaction._emoji.name === "🗡️";
                const [player1, player2] = await msg.awaitReactions({ filter, max: 2 }).then((reaction) => reaction.get("🗡️").users.cache.filter((user) => !user.bot).values());
            let number = Math.floor(Math.random() * 899) + 100;
            let channel = await msg.guild.channels.create(`${lang.commands.fun.morpion[1]}-${number}`, {
                type: "GUILD_TEXT",
                permissionOverwrites: [
                    { id: message.guild.id, deny: ["VIEW_CHANNEL"] },
                    {
                        id: player1.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                    {
                        id: player2.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES"],
                    },
                ],
            });

            channel.send(lang.commands.fun.morpion[2]);
            channel.send(
                `${
          player1
        } VS ${
          player2
        }`
            );
            let morpion = await channel.send({embeds: [new container.Discord.MessageEmbed()
                .setDescription(
                    `🗡️ FIGHT${
            player1
        } VS ${
            player2
          }
      `
                )
                .setColor(colors.PERSO)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})]});

            let players = [{
                    user: `${
            player1
          }`,
                    player1: "X",
                },
                {
                    user: `${
            player2
          }`,
                    player2: "O",
                },
            ];
            let Morpion = new container.Discord.MessageEmbed()
                .setTitle(lang.commands.fun.morpion[3])
                .setColor(colors.PERSO)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setDescription(`${lang.commands.fun.morpion[4]}: ${players[0].user}
\`\`\`
1  |  2  |  3
4  |  5  |  6
7  |  8  |  9
\`\`\`
`);
            morpion.edit({ embeds: [Morpion] }).then(async(msg) => {
                await Promise.all(
                    ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"].map((r) =>
                        msg.react(r)
                    )
                );
                let gameStatus = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
                let winners;
                await game(players, msg, gameStatus, winners)
            })
        });
        async function checkwinner(gameStatus, win, msg, players, player, winners) {
            for (const trio of win) {
                let one = trio[0];
                let two = trio[1];
                let three = trio[2];
                if (
                    gameStatus[one] === gameStatus[two] &&
                    gameStatus[one] === gameStatus[three]
                ) {
                    winners = `${lang.commands.fun.morpion[4]}  ${player}`;
                    msg.edit({
                        embed: {
                            description: lang.commands.fun.morpion[5].replace('{PLAYER}', players[player].user),
                            color: colors.PERSO,
                            footer: `© ${client.user.username}`,
                        },
                    });
                    setTimeout(() => {
                        msg.channel.delete();
                    }, 5000);
                    return true;
                }
            }
        }
        async function player(players, msg, gameStatus, player) {
            let reaction = (
                await msg.awaitReactions(
                    (reaction, user) => ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"].includes(
                        reaction.emoji.name
                    ) &&
                    !user.bot &&
                    gameStatus[parseInt(emojis[reaction.emoji.name]) - 1] ===
                    emojis[reaction.emoji.name] &&
                    user.id === players[player].user.slice(2, -1), { max: 1 }
                )
            ).first();
            gameStatus[parseInt(emojis[reaction.emoji.name]) - 1] =
                players[player].reaction;
            msg.edit({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${lang.commands.fun.morpion[4]}  : ${
            player === 0 ? players[1].user : players[0].user
          }\`\`\`
    ${
      emojis[reaction.emoji.name] === "1"
        ? players[player].reaction
        : gameStatus[0]
    }  |  ${
            emojis[reaction.emoji.name] === "2"
              ? players[player].reaction
              : gameStatus[1]
          }  |  ${
            emojis[reaction.emoji.name] === "3"
              ? players[player].reaction
              : gameStatus[2]
          }
    ${
      emojis[reaction.emoji.name] === "4"
        ? players[player].reaction
        : gameStatus[3]
    }  |  ${
            emojis[reaction.emoji.name] === "5"
              ? players[player].reaction
              : gameStatus[4]
          }  |  ${
            emojis[reaction.emoji.name] === "6"
              ? players[player].reaction
              : gameStatus[5]
          }
    ${
      emojis[reaction.emoji.name] === "7"
        ? players[player].reaction
        : gameStatus[6]
    }  |  ${
            emojis[reaction.emoji.name] === "8"
              ? players[player].reaction
              : gameStatus[7]
          }  |  ${
            emojis[reaction.emoji.name] === "9"
              ? players[player].reaction
              : gameStatus[8]
          }
    \`\`\``)
                    .setColor(colors.PERSO)
                    .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
        ],
            });
        }

        function checktie(gameStatus, winners, msg) {
            if (gameStatus.every((value) => ["O", "X"].includes(value))) {
                winners = lang.commands.fun.morpion[6];
                msg.edit({
                    embed: {
                        description: lang.commands.fun.morpion[7],
                        color: colors.RED,
                        footer: `© ${client.user.username}`,
                    },
                });
                setTimeout(() => {
                    msg.channel.delete();
                }, 5000);
                return true;
            }
        }

        function game(players, msg, gameStatus, winners) {
            const win = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6],
            ];
            new Promise(async(resolve, reject) => {
                do {
                    if (winners) return;
                    await player(players, msg, gameStatus, 0);
                    if (await checkwinner(gameStatus, win, msg, players, 0, winners)) {
                        resolve();
                        break;
                    }
                    if (await checktie(gameStatus, winners, msg)) {
                        resolve();
                        break;
                    }
                    if (winners) return;
                    await player(players, msg, gameStatus, 1);
                    if (await checkwinner(gameStatus, win, msg, players, 1, winners)) {
                        resolve();
                        break;
                    }
                    if (await checktie(gameStatus, winners, msg)) {
                        resolve();
                        break;
                    }
                } while (!winners);
            });
        }
        setTimeout(() =>{
            message.delete();
          }, 300)
        } catch (e) {
            client.guilds.cache.get(container.Config.supporGuild).channels.cache.get(container.Config.reportChannel).send({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription('Petit problème avec un utilisateur.')
                    .addField('Nom de la commande', 'Morpion')
                    .addField('Erreur', `\`\`\`${e}\`\`\``)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                    .setColor(colors.PERSO)
                ]
            })
            message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setDescription(`${lang.commands.problem[0]}`)
                    .setColor(colors.EPINGLE)
                    .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            })
            console.log(e)
        }
    }
};