module.exports = {
    name: "test",
    description: "test",
    aliases: ["t"],
    
    run: async(client, message, args, container) => {
			console.log('test')
			message.reply('test')
}
}