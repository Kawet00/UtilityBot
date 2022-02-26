const db = require('quick.db')

module.exports= {
    name: 'embed-builder',
    aliases: ["e-b"],
    onlyUsers: ["509765051435974692", "691644619758370846"],

    run: async(client, message, args, Discord) => {
        client.langs = new Discord.Collection()
        
              const Handler = require(`../../../Structures/Handlers/Handler`);
          await Handler.loadLangs(client);
        
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`))

        let msgBE = new Discord.MessageEmbed()
        .setTitle(`${lang.commands.util.embed[0]}`)
        .setDescription(`${lang.commands.util.embed[1]}`)

        const msgFE = await message.channel.send({embeds: [msgBE]})
        const msgwait = await message.reply(`${lang.commands.util.embed[2]}`);
        await Promise.all(['✏', '💬', '🕵️‍♂️', '🔻', '🔳', '⌚', '🖼', '🌐', '🔵', '↩', '✅'].map(r => msgwait.react(r)));
        await msgwait.edit({
            embeds: [
            new Discord.MessageEmbed()
            .setTitle(`${lang.commands.util.embed[3]}`)
            .setDescription(`${lang.commands.util.embed[4]}`)
            .addFields(
                {
                    name: lang.commands.util.embed[5],
                    value: '✏',
                    inline: true
                }, {
                    name: lang.commands.util.embed[6],
                    value: '💬',
                    inline: true
                }, {
                    name: lang.commands.util.embed[7],
                    value: '🕵️‍♂️',
                    inline: true
                }, {
                    name: lang.commands.util.embed[8],
                    value: '🔻'
                }, {
                    name: lang.commands.util.embed[9],
                    value: '🔳',
                    inline: true
                }, {
                    name: lang.commands.util.embed[10],
                    value: "⌚",
                    inline: true
                }, {
                    name: lang.commands.util.embed[11],
                    value: '🖼',
                    inline: true
                }, {
                    name: lang.commands.util.embed[12],
                    value: '🌐',
                    inline: true
                }, {
                    name: lang.commands.util.embed[13],
                    value: "🔵",
                    inline: true
                }, {
                    name: lang.commands.util.embed[14],
                    value: '↩',
                    inline: true
                }, {
                    name: lang.commands.util.embed[15],
                    value: `✅\n\n[${lang.commandsa[0]}](https://nepust.fr/)`
                }
            )
            ]
        })

        const filterR = (reaction, user) => user.id === message.author.id && !user.bot;
        const filterM = (m) => m.author.id === message.author.id && !m.author.bot;
        const collectorR = await new Discord.ReactionCollector(msgwait, filterR);
        collectorR.on('collect', async reaction => {
            switch(reaction._emoji.name) {
                case '✏':
                    const msgQT = await message.channel.send(lang.commands.util.embed[16]);
                    const title =  (await message.channel.awaitMessages({filterM, max: 1, time: 60000})).first().content;
                    msgQT.delete();
                    msgBE.setTitle(title);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[17]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '💬':
                    const msgQD = await message.channel.send(lang.commands.util.embed[18]);
                    const description =  (await message.channel.awaitMessages({filterM, max: 1, time: 60000})).first().content;
                    msgQD.delete();
                    msgBE.setDescription(description);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[19]).then(m => {
                            setTimeout(() => {
                            m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🕵️‍♂️':
                    const msgQA = await message.channel.send(lang.commands.util.embed[20]);
                    const auteur =  (await message.channel.awaitMessages({filterM, max: 1, time: 60000})).first().content;
                    msgQA.delete();
                    const msgQAU = await message.channel.send(lang.commands.util.embed[43])
                    const auteurURL = (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    if(!auteurURL.includes('http') || !auteurURL.includes('https')) return message.channel.send(lang.commands.util.embed["26"])
                    msgQAU.delete();
                    msgBE.setAuthor({ name: auteur, iconURL: auteurURL });
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[21]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🔻':
                    const msgQF = await message.channel.send(lang.commands.util.embed[22]);
                    const footer =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    msgQF.delete();
                    msgBE.setFooter(footer);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[23]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🔳':
                    const msgQTh = await message.channel.send(lang.commands.util.embed[24]);
                    const thumbnail =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    if(!thumbnail.includes('http') || !thumbnail.includes('https')) return message.channel.send(lang.commands.util.embed[25])
                    msgQTh.delete();
                    msgBE.setThumbnail(thumbnail);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[26]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '⌚':
                    msgBE.setTimestamp();
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[27]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🖼':
                    const msgQI = await message.channel.send(lang.commands.util.embed[28]);
                    const image =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    if(!image.includes('http') || !image.includes('https')) return message.channel.send(lang.commands.util.embed[29])
                    msgQI.delete();
                    msgBE.setImage(image);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[30]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🌐':
                    const msgQU = await message.channel.send(lang.commands.util.embed[31]);
                    const url =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    if(!url.includes('http') || !url.includes('https')) return message.channel.send(lang.commands.util.embed[32])
                    msgQU.delete();
                    msgBE.setURL(url);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[33]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '🔵':
                    const msgQC = await message.channel.send(lang.commands.util.embed[34]);
                    const couleur =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    if(!couleur.includes('#')) return message.channel.send(lang.commands.util.embed[35])
                    msgQC.delete();
                    msgBE.setColor(couleur);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[36]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '↩':
                    const msgQTF = await message.channel.send(lang.commands.util.embed[37]);
                    const tfield =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    msgQTF.delete();
                    const msgQDF = await message.channel.send(lang.commands.util.embed[38]);
                    const dfield =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                    msgQDF.delete();
                    msgBE.addField(tfield, dfield);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send(lang.commands.util.embed[39]).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                    case '✅':
                        const msgQE = await message.channel.send(lang.commands.util.embed[40]);
                        const channel =  (await message.channel.awaitMessages({ filterM, max: 1, time: 60000})).first().content;
                        msgQE.delete();
                        if(!message.guild.channels.cache.get(channel)) return message.channel.send(lang.commands.util.embed[41])
                        else message.guild.channels.cache.get(channel).send({
                            embeds: [msgBE]
                        }).then(() => {
                            message.channel.send(lang.commands.util.embed[42]).then(m => {
                                setTimeout(() => {
                                m.delete()
                            }, 5000)
                            });
                        })
                    break;
            }
        })
    }
}