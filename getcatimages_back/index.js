const express = require('express'); 
const axios = require('axios');
require ('dotenv').config();
const app = express();
const cors = require("cors");
app.use(cors());
const { PORT, API_KEY } = process.env;

app.get('/api/cats', async (req, res) => {
  try {
    const response = await axios.get(`https://api.thecatapi.com/v1/images/search?limit=5`, {
      headers: {
        'x-api-key': API_KEY,
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Beck rodando na porta http://localhost:${PORT}`);
});
