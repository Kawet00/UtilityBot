    const DarkDashboard = require('dbd-dark-dashboard');
    const DBD = require('discord-dashboard');
    const session = require('express-session');
    const FileStore = require('session-file-store')(session);
    const config = require('../../Storage/Vault/Config')
    const colors = require('../../Storage/json/colors.json')
    const emotes = require('../../Storage/json/emotes.json')
    const db = require('quick.db')
    const Discord = require('discord.js')
    function dateFormat(date) {
        return new Date(date).toLocaleString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: "numeric",
            minute: "2-digit"
          })
        }

    module.exports = async function (client) {
        await DBD.useLicense(config.DBD_LICENSE);
        DBD.Dashboard = DBD.UpdatedClass();
        const Dashboard = new DBD.Dashboard({
            port: 80,
            client: {
                id: config.ID,
                secret: config.secret_keyT,
            },
            underMaintenanceAccessKey: "/°-°/$**$**£",
            useUnderMaintenance: false,
            underMaintenanceAccessPage: "/maintenance",
            customPages: [
                DBD.customPagesTypes.redirectToUrl('/privacy-policy', () => {
                    return "https://www.utilitybot.ga/privacy-in-construction"
                }),
                DBD.customPagesTypes.redirectToUrl('*', () => {
                    return "https://www.utilitybot.ga/404";
                }),
            ],
            invite: {
                slash: "/invite",
                id: config.ID,
                scopes: ["bot", "applications.commands"],
                permissions: '276098126',
                redirectUri: 'http://localhost/discord/callback'
            },
            supportServer: {
                slash: '/support-server',
                inviteUrl: 'https://discord.com/invite/R39FrwyZ7w',
            },
            requiredPermissions: [DBD.DISCORD_FLAGS.Permissions.ADMINISTRATOR],
            redirectUri: 'http://localhost/discord/callback',
            domain: 'http://localhost',
            acceptPrivacyPolicy: false,
            sessionSaveSession: new FileStore(),
            bot: client,
            theme: DarkDashboard({
                SSL: {
                    enabled: true,
                    key: `MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDuG77rQJlOnT1OldvgOOx2lNaElS9dRI18ST/o8xn5SwsTqXdrpA1dolnhOV1lbnvuiou5a6jBNuCMnV8mZjhahPp/i8UIHC+qEDkX1zHlER/or1zQccQKskl0M914p7SKn7qYP2NKPmRGF9eZhTaJxrX3UVII228AOedEAmD6Roy71LNXiWTWA+O8xafTmdEVuWDg1Ni0pFYkD80PK/uLRahDRZ8iYCMijgxVa9S6mSUOCR2PrteCwW50ieMPBTse+9TOH5ZP/ujCpFw/FTHvjy/otTnZdlk3pLUMR64MiKaqpai9rh9V+rNqU5YBb8B1tLwr9MY0kLf7jopfK/edAgMBAAECggEAH9k6OkFTwD4r+xz0YhN7HYlfADDsOu92dU9e6wvJR50QCDs8q/svhny2xPdlVLHohcmmUtDhq6ZpdqV+GqbFluX+k5zgZ+tNPNQaruOr2tXljLwYEBGHhV6/kHl3gDH+ZiRjUwX3g/DAfNenkPNOjjM0F7aa4HBpcoBMPL6Mti0Dh6Y2f4I4IxiobiqYG5rDMBazi/zax4xmErhN5P4QBQueiDTsC+TuqBuPLWyMTlJDAdKDzNtcwhi81/ehvzLjRG+c1Zrx94st5mUjKn7+O5lzKu7WQm93BilwgwsLlIDiobNmSymulvpT+d5tBL6aKxetL4uZa/kWMGbFxQqiiQKBgQD9nq2QjtyrZkyvu22C2ZZVVYNG3XjeqL04obVPZxWRzG92Xn1FOWylFUq8heYwlpPB3+f82S3krFK2iBtFKFc26+XisKFPC6l11Z7n+t1tiURwQVPRubFbp6DXFP6NtLq+lFam+ESucEijMVsh37q8kP3LL4pv2znRV0z4dNjQIwKBgQDwV80vHbHu1z+3GyFom09F7sPs9fjlLumyPYnXZBo9CAglSGIhdulBRxR9Ze3oCxCBJAnzdyfyYtvaxbGtS+Gij96YxkwebQKks5OSiEIGjtYHMRrut1hPWAwVNJFqpoYmKD0iZ41AhD69OEIFalGUOitW3xJn4jtT792hOTi1PwKBgDsvkpWPoOmdfL0rGPC32BeqloZSSG9Axt6MVOsXM4/hSt8dYN4GTCVPXGtVcC1AxpVZFAPZrRcupi6PpLvDRtWBbnXOm217QAAsCq20oHDbOM9e5AP46HeBpzq21S6fnIHMAmbGnwS3ACpffjzuyJSO8f0+juMT3vZAa9hpU89AoGAG4fDLhl1r0kiuEO4UPYxX25ZLQSD7SSxikQ4TN7fjowj+rlO3Ex1rY+Jzk9lsAXMby6EoUnN3prqWiX5E0O05d0a/17/iyCrg9g6GDfZcEzeQVajoiKIUBZi0+8AlTnb9fT4A7/e0zwSv7P5BAvIqnT7T+kff5zPdO7t8TDPyRsCgYBzKo72ffX5rVEc4kxQHP0dY9zHirGue8CzSbuhVx2eM1V5aDzC0ZxPgtPLR7lPqBnFel3KaYjc9ea+qAOQ2fbFGmTYs9LXr7ftzJ38vxYyi2idLFYOQTzsiF22WxqpcY979gW8IZq7nGlBzZ6DZxpQFEpK3haMpvoVfIje0M2/6A==`,
                    cert: `MIIEFTCCAv2gAwIBAgIUczTISZV1cMdVEOO6HjKFjvBcyIswDQYJKoZIhvcNAQELBQAwgagxCzAJBgNVBAYTAlVTMRMwEQYDVQQIEwpDYWxpZm9ybmlhMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2NvMRkwFwYDVQQKExBDbG91ZGZsYXJlLCBJbmMuMRswGQYDVQQLExJ3d3cuY2xvdWRmbGFyZS5jb20xNDAyBgNVBAMTK01hbmFnZWQgQ0EgZDU0NTc2ZDRiODEzZjkwNWYzNzgzM2E4NDZhZGIyYzcwHhcNMjIwMzMwMTEyNzAwWhcNMzIwMzI3MTEyNzAwWjAiMQswCQYDVQQGEwJVUzETMBEGA1UEAxMKQ2xvdWRmbGFyZTCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAO4bvutAmU6dPU6V2+A47HaU1oSVL11EjXxJP+jzGflLCxOpd2ukDV2iWeE5XWVue+6Ki7lrqME24IydXyZmOFqE+n+LxQgcL6oQORfXMeURH+ivXNBxxAqySXQz3XintIqfupg/Y0o+ZEYX15mFNonGtfdRUgjbbwA550QCYPpGjLvUs1eJZNYD47zFp9OZ0RW5YODU2LSkViQPzQ8r+4tFqENFnyJgIyKODFVr1LqZJQ4JHY+u14LBbnSJ4w8FOx771M4flk/+6MKkXD8VMe+PL+i1Odl2WTektQxHrgyIpqqlqL2uH1X6s2pTlgFvwHW0vCv0xjSQt/uOil8r950CAwEAAaOBuzCBuDATBgNVHSUEDDAKBggrBgEFBQcDAjAMBgNVHRMBAf8EAjAAMB0GA1UdDgQWBBR/buSG021vMfX77BpRBE3Bgv3LbDAfBgNVHSMEGDAWgBQtJbOBFYkS+KjNMbftIZ9dnH6JnjBTBgNVHR8ETDBKMEigRqBEhkJodHRwOi8vY3JsLmNsb3VkZmxhcmUuY29tLzIzYmE0OWI5LWFhOGQtNDMzYi1iNDJiLWZhZGQyNWRjMTJlYS5jcmwwDQYJKoZIhvcNAQELBQADggEBAAyaBXF7CMWU5eUVFdSOLTITf/TyYJTsXr97fzVe5zIOpA7wPgYx/WQvR+8tOLqjoAAT+f8+ognNrjPp2+pNimawTVR2ooGnGhC4MpGlBZpLnK5eAIcIia4Ftg4Auw4s7rbjE3GPEVarbPSPvl2OSn3grtGOqvZR76k7R1sDyIN/eFkjfh+QnVk7bspBayx2oN/tAXwkxYBgbuBGTepLUhd662o8bUTnhaVL3x1xb5UeNFRFWsswFQva5LY+WU5huEMiA5Ice9GQXJvXRglwmvLqQRiRd8bzgazZKfWE9hUx5cMYnwdc3R5TgradcqvszrOPc7mf8tLIFeYTTnNw1vg=`
                },
                guilds: {
                    cardTitle: "Guilds",
                    cardDescription: "Here are all the guilds you currenly have permissions for:",
                    type: "blurlist"
                },
                popupMsg: {
                    savedSettings: "Settings Saved!",
                    noPerms: "You cannot.",
                },
                guildInfo: {
                    cardTitle: "Server Information",
                    cardDescription: "An overview about your server",
                },
                guildSettings: {
                    cardTitle: "Guilds",
                    cardDescription: "Here you can manage all the settings for your guild:",
                },
                information: {
                    createdBy: "Elpistolero13",
                    websiteTitle: "Utility Bot Dashboard",
                    websiteName: "Utility Bot",
                    websiteUrl: "http://localhost/discord/callback",
                    dashboardUrl: "http://localhost:3000/",
                    supportServer: "https://discord.gg/R39FrwyZ7w",
                    imageFavicon: "https://cdn.glitch.global/9c9dca97-de49-4d59-877f-1880b62d8a44/UT_Bot-Logo_1.1.png",
                    iconURL: "https://cdn.glitch.global/9c9dca97-de49-4d59-877f-1880b62d8a44/UT_Bot-Logo_1.1.png",
                    pageBackGround: "linear-gradient(#5865F2, #23272A)",
                    loggedIn: "Successfully signed in.",
                    mainColor: colors.PERSO,
                    subColor: colors.NOIR,
                },
                index: {
                    card: {
                        category: "iMidnight's Panel - The center of everything",
                        title: `Welcome to the iMidnight discord where you can control the core features to the bot.`,
                        image: "https://cdn.glitch.global/8a54e801-d5dc-4c3d-8d7d-ca1f7f85eb5f/UT_Bot-Logo_1.2_small.png",
                        footer: "Footer",
                    },
                    information: {
                        category: "Category",
                        title: "Information",
                        description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
                        footer: "Footer",
                    },
                    feeds: {
                        category: "test",
                        title: "Information",
                        description: `This bot and panel is currently a work in progress so contact me if you find any issues on discord.`,
                        footer: "Footer",
                    },
                },
                commands: [{
                    category: "Starting Up",
                    subTitle: "All helpful commands",
                    aliasesDisabled: false,
                    list: [{
                            commandName: "bug",
                            commandUsage: ";bug <bug>",
                            commandDescription: "Report a bug to the developers of Wooar.",
                            commandAlias: "No aliases"
                        },
                        {
                            commandName: "2nd command",
                            commandUsage: "oto.nd <arg> <arg2> [op]",
                            commandDescription: "Lorem ipsum dolor sth, arg sth arg2 stuff",
                            commandAlias: "Alias",
                        },
                        {
                            commandName: "Test command",
                            commandUsage: "prefix.test <arg> [op]",
                            commandDescription: "Lorem ipsum dolor sth",
                            commandAlias: "Alias",
                        },
                    ],
                }, ],
            }),

            settings: [{
                categoryId: 'general',
                categoryName: "General",
                categoryDescription: "General settings.",
                categoryOptionsList: [{
                    optionId: 'lang',
                    optionName: "Language",
                    optionDescription: "Change bot's language easily",
                    optionType: DBD.formTypes.select({
                        "English": 'en',
                        "French": 'fr'
                    }),
                    getActualSet: async ({
                        guild
                    }) => {
                        return db.get(`lang_${guild.id}`)
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`lang_${guild.id}`, newData)
                        return;
                    }
                }, {
                    optionId: 'prefix',
                    optionName: "Prefix",
                    optionDescription: "Change bot's prefix",
                    optionType: DBD.formTypes.input('Prefix', 1, 5),
                    getActualSet: async ({
                        guild
                    }) => {
                        GuildSettings.findOne({guildId: guild.id}).prefix || null
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        console.log(newData)
                        if(newData == null || newData == '') {
                        await GuildSettings.findOneAndUpdate({ guildId: guild.id }, { $set: { prefix: 'u!' }});
                        } else {
                            await GuildSettings.findOneAndUpdate({ guildId: guild.id }, { $set: { prefix: newData }});
                        }
                    }
                }, {
                    optionId: 'logs',
                    optionName: "Logs Channel",
                    optionDescription: "Select the channel for the logs.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes=["GUILD_TEXT"]),
                    getActualSet: async ({
                        guild
                    }) => {
                        return db.get(`logs_${guild.id}`)
                    },
                    setNew: async ({
                        guild,
                        user,
                        newData
                    }) => {
                        if(newData === null) return;
                        let lang = client.langs.get(db.get(`lang_${guild.id}`) || 'en');
                        const guildFetched = client.guilds.cache.get(guild.id)
                        const channelFetched = guildFetched.channels.cache.get(newData)
                        const userFetched = client.users.cache.get(user.id)

                        channelFetched.send({
                            embeds: [
                                new Discord.MessageEmbed()
                            .setTitle(`${emotes.autre.cool_pika} ┇ ${lang.commands.owner.setLo[1]}`)
                            .setColor(colors.VERT)
                             .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                            .setTimestamp()
                            .addField(lang.commands.owner.setLo[1], `<#${channelFetched.id}>`)
                            .addField(lang.commands.ownera[1], `<@!${userFetched.id}>`)
                            .addField('\u200B', '\u200B')
                            .addField(`Date`, `\`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\`\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                            ]
                        })
                        db.set(`logs_${guild.id}`, newData)
                        return;
                    }
                }, ]
            }, {
                categoryId: 'automatiquesMessages',
                categoryName: "Automatiques Messages",
                categoryDescription: "Modification of the automatique messages.",
                categoryOptionsList: [{
                    optionId: 'welcome',
                    optionName: "Welcome Channel",
                    optionDescription: "Send a message in a channel when a member join the server.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`welcome_${guild.id}`)) {
                        return db.get(`welcome_${guild.id}`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`welcome_${guild.id}`, newData)
                        return;
                    }
                }, {
                    optionId: 'welcomeMsg',
                    optionName: "Welcome Message",
                    optionDescription: "Edit the welcome message.",
                    optionType: DBD.formTypes.input(false, 10, 200, false, false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`welcomeMsg_${guild.id}`) === false) {
                            return null;
                        }
                        else if(db.get(`welcomeMsg_${guild.id}`) === 'false') {
                            return null;
                        }
                        else return db.get(`welcomeMsg_${guild.id}`)
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        if(newData === '') newData === null
                        if(newData === false) newData === null
                        db.set(`welcomeMsg_${guild.id}`, newData)
                    }
                }, {
                    optionId: 'welcomeRole',
                    optionName: "Welcome Role",
                    optionDescription: "Set a role when a member join the server.",
                    optionType: DBD.formTypes.rolesSelect(false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(!db.get(`welcomeRole.${guild.id}`)) {
                            return null;
                        }
                        else return db.get(`welcomeRole.${guild.id}`)
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`welcomeRole.${guild.id}`, newData)
                    }
                }, /*{
                    optionId: 'welcomemessage',
                    optionName: "Welcome Message",
                    optionDescription: "What is the message when a member join the server ?",
                    optionType: DBD.formTypes.embedBuilder({
                        username: client.user.username,
                        avatarURL: client.user.displayAvatarURL(),
                        defaultJson: {
                              content: "A new member is here !",
                              embed: {
                                  timestamp: new Date().toISOString(),
                                  url: "https://utilitybot.ga",
                                  description: "You can go in this channel to see the rules : <#{id of the channel}>",
                                  author: {
                                      name: "{{member}}"
                                  },
                                  color: colors.PERSO,
                                  footer: {
                                      text: `© ${client.user.username}`,
                                      icon_url: client.user.displayAvatarURL()
                                  },
                              }
                          }
                        }),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`welcomemsg_${guild.id}`))
                        return db.get(`welcomemsg_${guild.id}`)
                        null
                        return;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`welcomemsg_${guild.id}`, newData)
                        return;
                    }
                }, */{
                    optionId: 'leave',
                    optionName: "Leave Channel",
                    optionDescription: "Send a message in a channel when a member leave the server.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes = ["GUILD_TEXT"]),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`leave_${guild.id}`)) {
                        return db.get(`leave_${guild.id}`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`leave_${guild.id}`, newData)
                        return;
                    }
                }, {
                    optionId: 'leaveMsg',
                    optionName: "Leave Message",
                    optionDescription: "Edit the leave message.",
                    optionType: DBD.formTypes.textarea(false, 10, 400, false, false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`leaveMsg_${guild.id}`)) {
                        return db.get(`leaveMsg_${guild.id}`)
                        }
                        if(db.get(`leaveMsg_${guild.id}`) === '' || db.get(`leaveMsg_${guild.id}`) === null) {
                            return null;
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        if(newData === '' && db.get(`leaveMsg_${guild.id}`)) {
                            db.delete(`leaveMsg_${guild.id}`)
                            return
                        } else if(newData === '' && !db.get(`leaveMsg_${guild.id}`)){
                            return null;
                        } else if(newData === null) {
                            return null;
                        } else{
                        db.set(`leaveMsg_${guild.id}`, newData)
                        return
                        }
                    }
                },]
            }, {
                categoryId: 'tickets',
                categoryName: "Tickets",
                categoryDescription: "Configure the ticket system.",
                categoryOptionsList: [{
                    optionId: 'channel',
                    optionName: "Channel",
                    optionDescription: "Choose the channel where the message to create a ticket.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes = ['GUILD_TEXT']),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.ChannelID`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`ticket.${guild.id}.ChannelID`, newData)
                        return;
                    }
                }, {
                    optionId: 'category',
                    optionName: "Category",
                    optionDescription: "Choose the category where the tickets will be stocked.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes = ['GUILD_CATEGORY']),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.CategoryID`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`ticket.${guild.id}.CategoryID`, newData)
                        return;
                    }
                }, {
                    optionId: 'transcripts',
                    optionName: "Transcript Channel",
                    optionDescription: "Choose the channel where the transcripts of the ticket will be send.",
                    optionType: DBD.formTypes.channelsSelect(false, channelTypes = ['GUILD_TEXT']),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.Transcripts`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`ticket.${guild.id}.Transcripts`, newData)
                        return;
                    }
                }, {
                    optionId: 'handlers',
                    optionName: "Roles",
                    optionDescription: "Choose the roles who can access to the tickets.",
                    optionType: DBD.formTypes.rolesMultiSelect(false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if(db.get(`ticket.${guild.id}`)) {
                        return db.get(`ticket.${guild.id}.Handlers`)
                        }
                        return [];
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`ticket.${guild.id}.Handlers`, newData)
                        return;
                    }
                }, {
                    optionId: 'description',
                    optionName: "Description",
                    optionDescription: "Put the description of the ticket message.",
                    optionType: DBD.formTypes.textarea(" ", 10, 1000, false, true),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.Description`)
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        const guildN = client.guilds.cache.get(guild.id).name
                        db.set(`ticket.${guild.id}.Description`, newData)
                        db.set(`ticket.${guild.id}.GuildName`, guildN)
                        setTimeout(() =>{
                            const buttons = new Discord.MessageActionRow()
                            if(db.get(`ticket.${guild.id}.EmojiBtn`)[0] !== '') {
                                buttons.addComponents(
                                 new Discord.MessageButton()
                                 .setCustomId(db.get(`ticket.${guild.id}.Button`)[0])
                                 .setLabel(db.get(`ticket.${guild.id}.Button`)[0])
                                 .setStyle('SUCCESS')
                                .setEmoji(db.get(`ticket.${guild.id}.EmojiBtn`)[0])
                                )
                            } else {
                           buttons.addComponents(
                            new Discord.MessageButton()
                            .setCustomId(db.get(`ticket.${guild.id}.Button`)[0])
                            .setLabel(db.get(`ticket.${guild.id}.Button`)[0])
                            .setStyle('SUCCESS'),
                            );

                            }

                            if(db.get(`ticket.${guild.id}.Button`)[1] !== '') {    
                                    if(db.get(`ticket.${guild.id}.EmojiBtn`)[1] !== '') {
                                        buttons.addComponents(
                                        new Discord.MessageButton()
                                        .setCustomId(db.get(`ticket.${guild.id}.Button`)[1])
                                        .setLabel(db.get(`ticket.${guild.id}.Button`)[1])
                                        .setStyle('PRIMARY')
                                        .setEmoji(db.get(`ticket.${guild.id}.EmojiBtn`)[1])
                                        )
                                    } else {
                                        buttons.addComponents(
                                            new Discord.MessageButton()
                                            .setCustomId(db.get(`ticket.${guild.id}.Button`)[1])
                                            .setLabel(db.get(`ticket.${guild.id}.Button`)[1])
                                            .setStyle('PRIMARY'),
                                            );
                                    }
                            }
                            const embed = new Discord.MessageEmbed()
                            .setAuthor({
                                name: client.guilds.cache.get(guild.id).name + ' | Ticket System',
                                iconURL: client.guilds.cache.get(guild.id).iconURL({
                                    dynamic: true
                                })
                            })
                            .setDescription(newData)
                            .setColor(colors.PERSO)
                            .setFooter({
                                text: `© ${client.user.username}`,
                                iconURL: client.user.displayAvatarURL()
                            })
                            .setTimestamp()

                        client.guilds.cache
                        .get(guild.id).channels.cache
                            .get(db.get(`ticket.${guild.id}.ChannelID`))
                            .send({
                                embeds: [embed],
                                components: [buttons]
                            })
                        }, 300)
                    }
                }, {
                    optionId: 'button1',
                    optionName: "First Button name",
                    optionDescription: "Here put the name of the first button.",
                    optionType: DBD.formTypes.input(" ", 2, 10, false, true),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.Button`)[0]
                        }
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.set(`ticket.${guild.id}.Button`, [])
                        db.push(`ticket.${guild.id}.Button`, newData)
                        return;
                    }
                }, {
                    optionId: 'buttonemoji1',
                    optionName: "Emoji of the first Button",
                    optionDescription: "OPTIONAL => Here you can put the emoji of the first button. You need to write this in a discord channel : `\\:nameofthebutton:` and paste here whate you have",
                    optionType: DBD.formTypes.input(" ", 2, 10, false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`)) {
                            return db.get(`ticket.${guild.id}.EmojiBtn`)[0]
                        } 
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        if(newData == null) return
                        db.set(`ticket.${guild.id}.EmojiBtn`, [])
                        db.push(`ticket.${guild.id}.EmojiBtn`, newData)
                        return;
                    }
                }, {
                    optionId: 'button2',
                    optionName: "Second Button name",
                    optionDescription: "Here put the name of the second button.",
                    optionType: DBD.formTypes.input(" ", 2, 10, false, false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`))
                            return db.get(`ticket.${guild.id}.Button`)[1]
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        db.push(`ticket.${guild.id}.Button`, newData)
                        return;
                    }
                }, {
                    optionId: 'buttonemoji2',
                    optionName: "Emoji of the second Button",
                    optionDescription: "OPTIONAL => Here you can put the emoji of the second button. You need to write this in a discord channel : `\\:nameofthebutton:` and paste here whate you have",
                    optionType: DBD.formTypes.input(" ", 2, 10, false),
                    getActualSet: async ({
                        guild
                    }) => {
                        if (db.get(`ticket.${guild.id}`))
                            return db.get(`ticket.${guild.id}.EmojiBtn`)[1]
                        return null;
                    },
                    setNew: async ({
                        guild,
                        newData
                    }) => {
                        if(newData == null) return
                        db.push(`ticket.${guild.id}.EmojiBtn`, newData)
                        return;
                    }
                }]
            }, ],
        });
        Dashboard.useThirdPartyModule(
        module.exports = {
            app: ({app,config,themeConfig}) => {
                app.get('/moduleexample', (req,res)=>{
                   res.send('ModuleExample: Hello World!');
                });
            },
            server: ({io,server,config,themeConfig}) => {
                const test = io.of('/moduleexample');
                test.on('connection', () => {
                    console.log('ModuleExample socket.io connected.');
                });
            }
        }
        )
        Dashboard.init();
    }