const axios = require('axios');

module.exports = {
  name: 'status',
  ownerOnly: true,

  run: async (client, message, args, container) => {
    axios({
      method: 'post',
      url: "https://api.uptimerobot.com/v2/getMonitors?api_key=u1397014-9e12216c65d35a535d645b99",
      data: {
        custom_uptime_ratios: "30",
        response_times: 1,
      }
    }).then((res) => {
      client.channels.cache.get(container.Config.StatusChannel).bulkDelete(1)
      
      const wc = new container.Discord.WebhookClient({
        id: '963009655657873458',
        token: '6M0TYt6Ss0btLzDxuvrypdoQFnwOMvZWmaadX9f28qE_vbgi5HRA5eGtI7KC5udi1shB'
      })

      const embed = new container.Discord.MessageEmbed()
        .setColor(container.Colors.PERSO)
        .setAuthor({
          name: 'Status',
          iconURL: client.user.displayAvatarURL(),
          url: 'https://status.utilitybot.ga'
        })
        .setDescription('ㅤ')
        .addField(`${res.data.monitors[1].status === 2 ? container.Emotes.online: container.Emotes.offline} Discord Bot`, `Latency: **${res.data.monitors[1].average_response_time}ms**
      Operational at: **${res.data.monitors[1].custom_uptime_ratio}%**\nㅤ`)
        .addField(`${res.data.monitors[0].status === 2 ? container.Emotes.online: container.Emotes.offline} Website`, `Latency: **${res.data.monitors[2].average_response_time}ms**
      Operational at: **${res.data.monitors[2].custom_uptime_ratio}%**\nㅤ`)
        .addField(`${res.data.monitors[2].status === 2 ? container.Emotes.online: container.Emotes.offline} Dashboard`, `Latency: **${res.data.monitors[0].average_response_time}ms**
      Operational at: **${res.data.monitors[0].custom_uptime_ratio}%**\nㅤ`)

      wc.send({
        embeds: [embed]
      })
      setInterval(() => {
        client.channels.cache.get(container.Config.StatusChannel).bulkDelete(1)

        const embed = new container.Discord.MessageEmbed()
          .setColor(container.Colors.PERSO)
          .addField(`${res.data.monitors[1].status === 2 ? container.Emotes.online: container.Emotes.offline} Discord Bot`, `Latency: **${res.data.monitors[1].average_response_time}ms**
        Operational at: **${res.data.monitors[1].custom_uptime_ratio}%**\nㅤ`)
          .addField(`${res.data.monitors[0].status === 2 ? container.Emotes.online: container.Emotes.offline} Website`, `Latency: **${res.data.monitors[2].average_response_time}ms**
        Operational at: **${res.data.monitors[2].custom_uptime_ratio}%**\nㅤ`)
          .addField(`${res.data.monitors[2].status === 2 ? container.Emotes.online: container.Emotes.offline} Dashboard`, `Latency: **${res.data.monitors[0].average_response_time}ms**
        Operational at: **${res.data.monitors[0].custom_uptime_ratio}%**\nㅤ`)

        wc.send({
          embeds: [embed]
        })
      }, 45000)
    })
  }
}