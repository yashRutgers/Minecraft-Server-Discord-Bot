const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
client.login('YOUR DISCORD BOT TOKEN HERE');
bot.on('ready', () =>{
    console.log('bot online');
    bot.user.setActivity('usage /mc');
})
var request = require('request');
var mcCommand = '/mc'; 
var mcIP = "SERVER IP HERE"; 
var mcPort = "SERVER PORT HERE"; 
client.on('message', message => {
    if (message.content === mcCommand) {
        var url = 'http://mcapi.us/server/status?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Error getting Minecraft server status...');
            }
            body = JSON.parse(body);
            var status = "*Yash's Minecraft server is currently offline*";
            if(body.online) {
                status = "**Yash's Minecraft** server is **online**  -  ";
                if(body.players.now) {
                    status += '**' + body.players.now + '** people are playing!';
                } 
                else if(body.players.now === 1){
                    status += '**' + body.players.now + '** person is playing!';
                }
                else {
                    status += '*Nobody is playing!*';
                }
            }
            message.reply(status);
        });
    }
});
