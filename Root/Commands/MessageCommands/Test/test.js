		const EasyMenu = require('easymenu-pages')
		const Discord = require('discord.js')

module.exports = {
    name: "test",
    description: "test",
    aliases: ["t"],
    
    run: async(client, message, args, container) => {
			message.reply('test')
			const menu = new EasyMenu({
				channel: message.channel,
				usersID: message.author.id, //it can also be an array
				pages: [
					{
						name: "main",
						message: {
							content: "this is a easy menu",
							components: [
								new container.Discord.MessageActionRow().addComponents(
									new container.Discord.MessageSelectMenu()
										.setCustomId("select")
										.setPlaceholder("Nothing selected")
										.addOptions([
											{
												label: "menu",
												description: "test menu",
												value: "toMenu",
											},
										]),
								),
								new container.Discord.MessageActionRow().addComponents(
									new container.Discord.MessageButton().setCustomId("delete").setLabel("delete this msg").setStyle("DANGER"),
								),
							],
						},
						componentsActions: {
							delete: "delete",
							toMenu: "menu",
						},
					},
					{
						name: "menu",
						message: {
							content: "Hi this is a button with function",
							components: [
								new container.Discord.MessageActionRow().addComponents(
									new container.Discord.MessageButton().setCustomId("edit").setLabel("function").setStyle("PRIMARY"),
								),
							],
						},
						componentsActions: {
							edit: () => {
								menu.msgMenu.edit({ content: "Wow", components: [] });
							},
						},
					},
				],
			});
			
			menu.start();
			
			menu.on("collectorEnd", () => console.log("Menu: finished the menu collector"));
			
			menu.on("pageChange", (oldPage, newPage) => console.log(`Menu: page change from ${oldPage.name} to ${newPage.name}`));
}
}