const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000; // .env dosyasındaki PORT değeri veya varsayılan 3000

app.get("/", (req, res) => {
  res.send("Merhaba, Twitter klonuna hoş geldiniz!");
});

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda çalışıyor...`);
});
