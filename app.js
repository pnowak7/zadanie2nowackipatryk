require('dotenv').config();
const express = require('express');
const axios   = require('axios');
const app     = express();
const port    = process.env.PORT || 3000;
const author  = "Patryk Nowacki";

console.log(`Start: ${new Date().toISOString()}, Author: ${author}, Listening on port: ${port}`);

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const { country, city } = req.query;
  if (!country || !city) return res.redirect('/');
  try {
    const url = `http://api.openweathermap.org/data/2.5/weather`;
    const resp = await axios.get(url, {
      params: { q: `${city},${country}`, appid: process.env.OPENWEATHER_API_KEY, units: 'metric' }
    });
    res.json(resp.data);
  } catch (err) {
    res.status(500).send("Błąd pobierania danych pogodowych");
  }
});

app.listen(port);
