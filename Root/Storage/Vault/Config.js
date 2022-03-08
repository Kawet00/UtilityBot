module.exports = {
    prefix: ["u!"], /*Here you need to put your prefix*/
    developers: ["ID"], /*Here you need to put your id*/
    token: "TOKEN", /*Here you need to put the token of your bot*/
    AME_API: "KEY", /*Here you need to put your amethyste api key*/
    supporGuild: "ID", /*Here you need to put the id of your support guild*/
    reportChannel: "ID", /*Here you need to put the id of the channel*/

    opt: {
        maxVol: 250, /*The max volume of the music*/
        loopMessage: false, /*Put a loop message*/
        discordPlayer: {
            ytdlOptions: {
                quality: 'highestaudio', /*Don't touch*/
                highWaterMark: 1 << 25  /*Don't touch*/
            }
        }
    }
}