module.exports = {
    name: 'help',
    description: "this is a help command!",
    execute(message, args){
        message.channel.send('This is a discord bot that displays WRs, its still in development')
    }
}
