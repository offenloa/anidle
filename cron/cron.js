const Answer = require("../models/Answer.js")
const animeBank = require("../animebank.json")
async function update_answer() {
    let pool = animeBank.data.Page.media;
    let daily = pool[Math.floor((Math.random()*pool.length))];
    await Answer.updateOne({name: "daily"}, {code: daily.id, data: daily});
}

module.exports = update_answer;