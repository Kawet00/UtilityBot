const { GuildSettings, GuildTicket, GuildReactionRole, ActiveCommands } = require('./Models');

module.exports = class Manager {
	static async createGuild(id) {
		const result = new GuildSettings({
			GuildID: id,
			prefix: "u!",
			lang: "en"
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
		const result = await GuildSettings.findOne({ GuildID: id });

		return result;
	}

	static async getCommand(id, name) {
		const result = await ActiveCommands.findOne({ GuildID: id, Name: name });

		return result;
	}

	static async getPrefix(id) {
		const result = await GuildSettings.findOne({ GuildID: id });

		return result.prefix;
	}
	static async getLang(id) {
		const result = await GuildSettings.findOne({ GuildID: id });

		return result.lang;
	}

	static async updateGuildPrefix(id, prefix) {
		const result = await GuildSettings.findOne({ GuildID: id });

		if (result) {
			return await result.updateOne({ prefix });
		}
		else {
			return;
		}
	}

	static async updateActiveCommand(id, name, boolean) {
		const result = await ActiveCommands.findOne({ GuildID: id, Name: name });

		if (result) {
			return await result.updateOne({ Active: boolean });
		}
		else {
			return;
		}
	}
	static async updateGuildLang(id, lang) {
		const result = await GuildSettings.findOne({ GuildID: id });

		if (result) {
			return await result.updateOne({ lang });
		}
		else {
			return;
		}
	}
};