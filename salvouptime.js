const db = require("quick.db");
const discord = require("discord.js");
const client = new discord.Client({ disableEveryone: true });
client.login("OTA5NTMwOTQ4ODI2MTY5NDc0.YZFotA.q1IidMYMv9SxJBNesXtueKAGGng");
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);
const express = require("express");
const app = express();
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 3000);
client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Alper Uptime",
      type: "WATCHİNG",
      url: "URL"
    }
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(z => z.url)
            .includes(link)
        )
          return message.channel.send(new discord.MessageEmbed().setFooter("Alper ♡ Alper").setColor("RANDOM").setDescription("Projeniz Sistemimizde Zaten Var"));
        message.channel.send(new discord.MessageEmbed().setFooter("Alper ♡ Alper").setColor("RANDOM").setDescription("Projeniz Sistemimize Başarıyla Eklendi."));
        db.push("linkler", { url: link, owner: message.author.id });
      })
      .catch(e => {
        return message.channel.send(new discord.MessageEmbed().setFooter("Alper ♡ Alper").setColor("RANDOM").setDescription("Lütfen Bir Link Giriniz"));
      });
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Alper ♡ Alper").setColor("RANDOM").setDescription(`**Alper ♡ Alper**

**!ekle** <URL> = \`Projenizi Uptime Edersiniz\`

**!projeler** = \`Kaç Projenin Aktif Tutulduğunu Gösterir\``));
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!projeler") {
    var link = spl[1];
    message.channel.send(new discord.MessageEmbed().setFooter("Alper ♡ Alper").setColor("RANDOM").setDescription(`${db.get("linkler").length} Proje Aktif Tutuluyor!`));
  }
});
          


client.on("ready", async () => {
  client.user.setStatus("online");
  client.user.setActivity(`Alper ♡ Alper`);
 });
