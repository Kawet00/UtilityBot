const {GuildSettings, GuildTicket, GuildReactionRole, ActiveCommands} = require('./Models');

module.exports = class Manager {
    static async createGuild(id) {
        const result = new GuildSettings({
            GuildID: id,
            prefix: "u!",
            lang: "en",
            logs: null,
            music: {
                vol: 100
            },
            warns: {},
            channels: {
                join: null,
                leave: null
            },
            messages: {
                join: null,
                leave: null
            },
            roles: {
                join: null
            }
        });

        await result.save();

        return result;
    }

    static async deleteGuild(id) {
        const result = await GuildSettings.deleteOne({
            GuildID: id,
        });

        return result;
    }

    static async findGuild(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        return result;
    }

    static async getCommand(id, name) {
        const result = await ActiveCommands.findOne({GuildID: id, Name: name});

        return result;
    }

    static async getPrefix(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        return result?.prefix;
    }

    static async getLang(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        return result?.lang;
    }

    static async getLogsChannel(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        return result?.logs;
    }

    static async getVolume(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        return result?.music.vol;
    }

    static async getWarns(GuildId, UserId) {
        const result = await GuildSettings.findOne({GuildID: GuildId});

        if(result.warns[UserId]) return result.warns[UserId]
        else return null;
    }

    static async getJoinChannel(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        if(result.channels["join"] !== null) return result.channels["join"]
        else return null;
    }

    static async getJoinMessage(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        if(result.messages["join"] !== null) return result.messages["join"]
        else return null;
    }

    static async getJoinRole(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        if(result.roles["join"] !== null) return result.roles["join"]
        else return null;
    }

    static async getLeaveChannel(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        if(result.channels["leave"] !== null) return result.channels["leave"]
        else return null;
    }

    static async getLeaveMessage(id) {
        const result = await GuildSettings.findOne({GuildID: id});

        if(result.messages["leave"] !== null) return result.messages["leave"]
        else return null;
    }

    static async updatePrefix(id, prefix) {
        const result = await GuildSettings.findOne({GuildID: id});

        if (result) {
            return await result.updateOne({prefix: prefix});
            result.save()
        } else {
            throw new Error("Something went badly wrong!");
        }
    }

    static async updateActiveCommand(id, name, boolean) {
        const result = await ActiveCommands.findOne({GuildID: id, Name: name});

        if (result) {
            return await result.updateOne({Active: boolean});
            result.save()
        } else {
            throw new Error("Something went badly wrong!");
        }
    }

    static async updateLang(id, lang) {
        const result = await GuildSettings.findOne({GuildID: id});

        if (result) {
            return await result.updateOne({lang: lang});
            result.save()
        } else {
            throw new Error("Something went badly wrong!");
        }
    }

    static async updateLogsChannel(id, channelID) {
        const result = await GuildSettings.findOne({GuildID: id});

        if (result) {
            return await result.updateOne({logs: channelID});
            result.save()
        } else {
            throw new Error("Something went badly wrong!");
        }
    }

    static async updateWarns(GuildId, UserId, signs, Number) {
        const result = await GuildSettings.findOne({GuildID: GuildId});
        const user = result.warns[UserId];


        if (user === undefined) {
            if (signs === "add") {
                await result.updateOne({
                    $set: {
                        warns: {
                            [UserId]: 1
                        }
                    }
                })
                result.save()
            } else {
                return null;
            };
        } else {
            if (signs === "add") {
                let number = user + 1
                await result.updateOne({
                    $set: {
                        warns: {
                            [UserId]: number
                        }
                    }
                })
                result.save()
            } else {
                if(signs === "all") {
                    await result.updateOne({
                        $set: {
                            warns: {
                                [UserId]: 0
                            }
                        }
                    })
                    result.save()
                } else {
                    let number = user - Number
                    await result.updateOne({
                        $set: {
                            warns: {
                                [UserId]: number
                            }
                        }
                    })
                }
            }
        }
    }

    static async updateVolume(id, number) {
        const result = await GuildSettings.findOne({GuildID: id});

        if (result) {
            return await result.updateOne({music: {vol: number}});
        } else {
            throw new Error("Something went badly wrong!");
        }
    }
};