const chalk = require('chalk')

module.exports = {
    name: "errorManager",
    customEvent: true,

    run: async (client) => {
        process.on('unhandledRejection', error => {
            const err = error.stack.split("\n")
            console.log(chalk.bold.red("[Error Message] ") + chalk.magentaBright(err[0].trim()))
            console.log(chalk.bold.red("[Error Location] ") + chalk.magentaBright(err[1].trim()))
            console.log(error)
        })
        process.on('uncaughtException', error => {
            const err = error.stack.split("\n")
            console.log(chalk.bold.red("[Error Message] ") + chalk.magentaBright(err[0].trim()))
            console.log(chalk.bold.red("[Error Location] ") + chalk.magentaBright(err[1].trim()))
            console.log(error)
        })
    }
}