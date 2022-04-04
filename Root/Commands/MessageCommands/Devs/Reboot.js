module.exports = {
    name: 'reboot',
    ownerOnly: true,
    run: async (client, message, args, container) => {
      const embed = new container.Discord.MessageEmbed()
      .setDescription('Restarting...')
      message.channel.sendEmbed(embed)

      setTimeout(() => {
        process.on("exit", () => {
            require("child_process").spawn(process.argv.shift(), process.argv, {
                cwd: process.cwd(),
                detached: true,
                stdio: "inherit",
            });
        });
        process.exit();
      }, 300)
        }
    }