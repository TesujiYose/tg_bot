const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();


const token = '6153795364:AAE2F6PyuuZPm5MG9l1JSuC5h_9BLKaAS2Y';
const bot = new TelegramBot(token, { webHook: { port: process.env.PORT || 8080 } });

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Received your message');
});

app.get('/', (req, res) => {
    res.send('<html><body style="background-color: red; height: 100vh; width: 100vw; display: flex; align-items: center; justify-content: center;"><div style="background-color: white; height: 50px; width: 50px; border-radius: 25px;"></div></body></html>');
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




function getCurrentInfo() {
    const date = new Date();
    const startDate = new Date("2021-11-11T16:30:00");
    let seasons = ["Summer", "Autumn", "Winter", "Spring"];
    let seriesNames = ["WELCOME WEEK", "WELCOME TO MEXICO", "HOLIDAY SPECIAL", "HAPPY NEW YEAR", "HORIZON WORLD CUP", "HORIZON RUSH TAKEOVER", "HORIZON CUSTOMS", "CINCO DE MAYO",
        "GERMAN AUTOMOTIVE EXCELLENCE", "HOT WHEELS", "EXTREME E", "RAMI'S RACING HISTORY", "HORIZON ROAD TRIP", "HORIZON 10-YEAR ANNIVERSARY", "DONUT MEDIA", "HORIZON HOLIDAYS", "#FORDZATHON",
        "JAPANESE AUTOMOTIVE", "HORIZON WILDS TAKEOVER", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA", "TBA"];

    const diffTimeDays = (date - startDate) / (1000 * 60 * 60 * 24);
    const series = getSeries(diffTimeDays);
    const season = getSeason(diffTimeDays);
    let seasonExpired = startDate;
    seasonExpired = getDifferenceDates(date, addToDate(seasonExpired, ((series - 1) * 28 + (season + 1) * 7)));

    return (`${series} Series, ${seriesNames[series]}\nSeason is ${seasons[season]} and ends in ${seasonExpired}`);


    function getSeries(diffTime) {
        return Math.ceil(diffTime / 28);
    }
    function getSeason(diffTime) {
        return Math.floor(diffTime % 28 / 7);
    }
    function getDifferenceDates(day1, day2) {
        const diffTime = day2 - day1;

        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
        return (`${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes`);

    }
    function addToDate(date, days) {
        const next = new Date(date);
        next.setDate(next.getDate() + days);
        return next;
    }
}