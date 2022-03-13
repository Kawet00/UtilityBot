const db = require('quick.db')
const ms = require('ms')
const fetch = require('node-fetch')
const colors = require('../../../Storage/json/colors.json')


module.exports = {
	name: "timeout",
	description: "Set a timeout for a member",
    userPermissions: ['MANAGE_MESSAGES'],

	run: async(client, message, args, container) => {
        let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');
        
        const time = args[0]
        const user = message.mentions.members.first()
        if(!user) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.red_dark)
                .setDescription(`${container.Emotes.pepe.pepe_srx} ┇ ${lang.commands.mods.timeout[2]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        const reason = args.slice(2).join(" ") || lang.commands.mods["noR"]
        const member = message.guild.members.cache.get(user.id)

		const milliseconds = ms(time);
		const iosTime = new Date(Date.now() + milliseconds).toISOString();

        if(user.id === client.user.id) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.RED)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[3]}`)
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        if(user.id === message.member.is) return message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[4]}`)
                .setColor(colors.RED)
                .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })

        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply('t con toi')
        
		if(!milliseconds || milliseconds < 30000 || milliseconds > 2419200000) {
			return message.reply({
                embeds: [
                    new container.Discord.MessageEmbed()
                    .setColor(colors.green_light)
                    .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[0]
                                                                                               .replace('{30000}', ms(30000))
                                                                                               .replace('{2419200000}', ms(2419200000))}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                     .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                    .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
		}
        

        try {
            await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ communication_disabled_until: iosTime, reason: reason}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${ROOT.config.token}`,
                },
            });
        message.reply({
            embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.green_light)
                .setDescription(`${container.Emotes.pepe.pepe_n} ┇ ${lang.commands.mods.timeout[1]
                                                                                           .replace('{USER}', user)
                                                                                           .replace('{TIME}', time)}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
            ]
        }).then(() => {
            setTimeout(() =>{
              message.delete();
            }, 300)
        })
} catch(e) {
    console.log('test')
}
		}
	}