const express = require("express");
const redis = require("redis");

const app = express();
const client = redis.createClient({
  host: "redis-server",
  port: 6379
});
const PORT = process.env.PORT || 8000;

client.set("visits", 0);

app.get("/", (req, res) => {
  client.get("visits", (err, visits) => {
    if (err) return console.log(`Error >>>>`, err);
    res.send(`Total numbers of Visits ${visits}`);
    client.set("visits", ++visits);
  });
});

app.listen(PORT, () => {
  console.log(`App is listining at port ${PORT}`);
});
