const { Telegraf } = require('telegraf');
const axios = require('axios');
require("dotenv").config();

const TELEGRAM_BOT_TOKEN = 'your-token';
let params = {
    access_key: process.env.ACCESS_KEY,
};

const bot = new Telegraf(process.env.BOT_TOKEN || TELEGRAM_BOT_TOKEN);

bot.start((ctx) => ctx.reply('Welcome, enter place name(english keyboard)'));
bot.on('text', async ctx => {
    params.query = ctx.message.text;
    const weather = await axios.get('http://api.weatherstack.com/current', { params });
    const message = weather.data;
    
    ctx.reply(String(`
Joylashuv: ${message.location.name + " " + message.location.region + " " + message.location.country}
Harorat: ${message.current.temperature}
Shamol tezligi: ${message.current.wind_speed}
    `));
    ctx.replyWithPhoto(String(weather.data.current.weather_icons))
})


bot.launch()