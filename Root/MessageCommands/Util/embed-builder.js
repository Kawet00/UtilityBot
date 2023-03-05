const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder, ReactionCollector} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');

module.exports = {
    name: 'embed-builder',
    aliases: ["e-b"],

    run: async (client, message) => {
        let lang = client.langs.get(await getLang(message.guild.id) || 'en')

        let msgBE = new EmbedBuilder()
            .setTitle(`${lang.commands.util.embed[0]}`)
            .setDescription(`${lang.commands.util.embed[1]}`)

        const msgFE = await message.channel.send({embeds: [msgBE]})
        const msgwait = await message.reply(`${lang.commands.util.embed[2]}`);
        await Promise.all(['✏', '💬', '🕵️‍♂️', '🔻', '🔳', '⌚', '🖼', '🌐', '🔵', '↩', '✅'].map(r => msgwait.react(r)));
        await msgwait.edit({
            embeds: [
                new EmbedBuilder()
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
                            value: `✅`
                        }
                    )
            ]
        })

        const filterR = (user) => user.id === message.author.id && !user.bot;
        const filterM = (m) => m.author.id === message.author.id && !m.author.bot;
        const collectorR = await new ReactionCollector(msgwait, filterR);
        collectorR.on('collect', async reaction => {
            switch (reaction._emoji.name) {
                case '✏':
                    const msgQT = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[16]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const title = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (title == null) {
                        msgQT.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQT.delete();
                    msgBE.setTitle(title);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[17]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '💬':
                    const msgQD = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[18]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const description = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (description == null) {
                        msgQD.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQD.delete();
                    msgBE.setDescription(description);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[19]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🕵️‍♂️':
                    const msgQA = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[20]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const auteur = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (auteur == null) {
                        msgQT.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQA.delete();
                    const msgQAU = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[43]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const auteurURL = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (auteurURL == null) {
                        msgQAU.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    if (!auteurURL.includes('http') || !auteurURL.includes('https')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed["26"]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    msgQAU.delete();
                    msgBE.setAuthor({name: auteur, iconURL: auteurURL});
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[21]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🔻':
                    const msgQF = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[22]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const footer = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (footer == null) {
                        msgQF.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQF.delete();
                    msgBE.setFooter(footer);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[23]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🔳':
                    const msgQTh = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[24]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const thumbnail = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (thumbnail == null) {
                        msgQTh.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    if (!thumbnail.includes('http') || !thumbnail.includes('https')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[25]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    if (!thumbnail.endsWith('.png') || !thumbnail.endsWith('.gif') || !thumbnail.endsWith('.jpg') || !thumbnail.endsWith('.jpeg')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[44]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    msgQTh.delete();
                    msgBE.setThumbnail(thumbnail);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[26]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
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
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[27]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🖼':
                    const msgQI = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[28]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const image = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (image == null) {
                        msgQI.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    if (!image.includes('http') || !image.includes('https')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[29]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    msgQI.delete();
                    msgBE.setImage(image);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[30]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🌐':
                    const msgQU = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[31]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const url = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (url == null) {
                        msgQU.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    if (!url.includes('http') || !url.includes('https')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[32]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    msgQU.delete();
                    msgBE.setURL(url);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[33]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '🔵':
                    const msgQC = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[34]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const couleur = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (couleur == null) {
                        msgQC.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    if (!couleur.includes('#')) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[35]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    msgQC.delete();
                    msgBE.setColor(couleur);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[36]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '↩':
                    const msgQTF = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[37]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    const tfield = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (tfield == null) {
                        msgQTF.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQTF.delete();
                    const msgQDF = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx}  ${lang.commands.util.embed[38]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const dfield = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (dfield == null) {
                        msgQDF.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQDF.delete();
                    msgBE.addField(tfield, dfield);
                    msgFE.edit({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[39]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
                            setTimeout(() => {
                                m.delete()
                            }, 5000)
                        });
                    });
                    break;
                case '✅':
                    const msgQE = await message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[40]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    });
                    const channel = (await message.channel.awaitMessages({
                        filter: filterM,
                        max: 1,
                        time: 60000
                    })).first()?.content;
                    if (channel == null) {
                        msgQE.delete()
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .seDescription(`${emotes.pepe.pepe_a} ${lang.commands.util.embed[45]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                                    .setColor(colors.EPINGLE)
                            ]
                        })
                    }
                    msgQE.delete();
                    if (!message.guild.channels.cache.get(channel)) return message.channel.send({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(`${emotes.pepe.pepe_srx} ${lang.commands.util.embed[41]}`)
                                .setFooter({text: `© ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
                                .setTimestamp()
                        ]
                    })
                    else message.guild.channels.cache.get(channel).send({
                        embeds: [msgBE]
                    }).then(() => {
                        message.channel.send({
                            embeds: [
                                new EmbedBuilder()
                                    .setDescription(`${emotes.blob.blob_g} ${lang.commands.util.embed[42]}`)
                                    .setFooter({
                                        text: `© ${client.user.username}`,
                                        iconURL: client.user.displayAvatarURL()
                                    })
                                    .setTimestamp()
                            ]
                        }).then(m => {
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