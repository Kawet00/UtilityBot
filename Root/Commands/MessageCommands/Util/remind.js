const db = require('quick.db');
const colors = require('../../../Storage/json/colors.json')

module.exports = {
  name: "remind",
  description: "remind",
  aliases: ["rm"],

  run: async(client, message, args, container) => {
        
    let lang = client.langs.get(db.get(`lang_${message.guild.id}`) || 'en');

    let giveawayDuration = args[1];
        if (!giveawayDuration) {
            return message.reply({
                embeds: [
                new container.Discord.MessageEmbed()
                .setColor(colors.EPINGLE)
                .setDescription(`${container.Emotes.pepe.pepe_a} ┇ ${lang.commands.owner.startG[1]}\n\n[${lang.commandsa[0]}](https://nepust.fr/)`)
                 .setFooter({text: `© ${client.user.username}`,  iconURL: client.user.displayAvatarURL()})
                .setTimestamp()
                ]
            }).then(() => {
                setTimeout(() =>{
                  message.delete();
                }, 300)
            })
        }
    var filteredMessage = args.slice(2).join(" ") || lang.commands.modsa[2];
    function reminder() {
      message.reply("\n**REMINDER:**\n" + filteredMessage);
    }
    console.log(args[0].slice(1))
      if(args[0].slice(2) === 's' || args[0].slice(1) === 's') {
        console.log('s')
        var msDelay = args[0].slice(0, -1) * 1000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " seconds.");
        setTimeout(reminder, msDelay);
      }

      if(args[0].slice(2) === 'm' || args[0].slice(1) === 'm') {
        var msDelay = args[0].slice(0, -1) * 60000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " minutes.");
        setTimeout(reminder, msDelay);
      }

        if(args[0].slice(2) === 'h' || args[0].slice(1) === 'h') {
        var msDelay = args[0].slice(0, -1) * 3600000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " hours.");
        setTimeout(reminder, msDelay);
      }
      
      if(args[0].slice(2) === 'd' || args[0].slice(1) === 'd') {
        var msDelay = args[0].slice(0, -1) * 86400000;
        message.reply("Your reminder has been set. I will remind you in " + args[0].slice(0, -1) + " days.");
        setTimeout(reminder, msDelay);
    }
}
  }
