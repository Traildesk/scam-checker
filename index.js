require("dotenv").config();
const Discord = require("discord.js");
const axios = require("axios");
const { getScamInfo } = require("./scamChecker");
const client = new Discord.Client();

let interval;
client.on("message", async (msg) => {
  let prefix = msg.content.split(" ")[0];
  switch (prefix) {
    case "!ping":
      msg.reply("Pong!");
      break;
    case "!meme":
      msg.channel.send("Here's your meme!");
      const img = await getMeme();
      msg.channel.send(img);
      break;
    case "!scam":
      let address = msg.content.split(" ")[1];
      const message = await getScamInfo(address);
      msg.channel.send("", { embed: message });
  }
});

async function getMeme() {
  const res = await axios.get("https://memeapi.pythonanywhere.com/");
  console.log(res.data);
  return res.data.memes[0].url;
}

//must be last line
client.login(process.env.CLIENT_TOKEN);
