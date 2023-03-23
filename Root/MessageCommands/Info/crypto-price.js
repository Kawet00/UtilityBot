const {getLang} = require('../../Storage/db/manager');
const {EmbedBuilder} = require('discord.js');
const colors = require('../../Storage/json/colors.json');
const emotes = require('../../Storage/json/emotes.json');
const fetch = require('node-fetch');

module.exports = {
    name: "crypto-price",
    aliases: ["c-p"],

    run: async (client, message, args) => {

        let lang = client.langs.get(await getLang(message.guild.id) || 'en');

        if (!args[0]) return message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_a} ┇ ${lang.commands.util.Crypto[0]} `)
                    .setColor(colors.RED)
                    .setFooter({
                        text: `© ${client.user.username}`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        })

        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${args[0]}`
        );
        const data = await response.json();

        if(data.error === "coin not found") return message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.util.Crypto[3]} `)
                    .setColor(colors.EPINGLE)
                    .setFooter({
                        text: `© ${client.user.username}`,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setTimestamp()
            ]
        })

        if (!response) {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`${emotes.pepe.pepe_ns} ┇ ${lang.commands.util.Crypto[1]} `)
                        .setColor(colors.EPINGLE)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                ]
            })
        } else {
            message.channel.send({
                embeds: [
                    new EmbedBuilder()
                        .setColor(colors.PERSO)
                        .setFooter({
                            text: `© ${client.user.username}`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setTimestamp()
                        .setTitle(`${data.name}`)
                        .addFields(
                            {name: lang.commands.util.Crypto[2], value: `EUR: **${data.market_data.current_price.eur}** €\n USD: **${data.market_data.current_price.usd}** $`}
                        )
                ]
            })
        }
    }
}