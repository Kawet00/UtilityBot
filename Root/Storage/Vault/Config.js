

module.exports = {
    developers: ["ID"], /*Here you need to put your id*/
    token: "TOKEN", /*Here you need to put the token of your bot*/
    AME_API: "KEY", /*Here you need to put your amethyste api key*/
    supporGuild: "ID", /*Here you need to put the id of your support guild*/
    reportChannel: "ID", /*Here you need to put the id of the channel*/
    DOG_API_KEY: "KEY", /*Here your dog api key*/
    DOG_API_URL: "https://api.thedogapi.com/", /*Don't touch*/
    GITHUB_API_KEY: "KEY", /*Here put your github api key*/
    GIPHY_API_KEY: "KEY", /*Here put your giphy api key*/
    APOD_API_KEY: "KEY", /*Here put your apod api key*/

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