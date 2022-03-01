module.exports = {
    name : 'saveBtn',
    
    run : async(client, interaction, container) => {
        const queue = client.player.getQueue(interaction.guildId);
          if (!queue || !queue.playing) return interaction.reply({ content: `No music currently playing. ❌`, ephemeral: true, components: [] });

          interaction.member.send(`**Track Saved: \`${queue.current.title}\` | Posted by \`${queue.current.author}\`, Saved Server: \`${interaction.member.guild.name}\` ✅**`).then(() => {
                return interaction.reply({ content: `I sent you the name of the music in a private message ✅`, ephemeral: true, components: [] });
            }).catch(error => {
                return interaction.reply({ content: `I can't send you a private message. ❌`, ephemeral: true, components: [] });
            });
        }
}