const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const shortId = require('shortid');
const ShortUrl = require('./models/shortUrl');

const app = express();

const PORT = process.env.PORT || 5000;
const DB = process.env.DB_HOST;

mongoose.connect(DB, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('Connection Open!!!')
    })
    .catch(err => {
        console.log(`Mongo Error: ${err}`)
    })

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find();
    res.send(shortUrls);
})

app.post('/shortUrl', async (req, res) => {
    const { fullUrl } = req.body;
    let short = `http://localhost:3000/${shortId.generate()}`;
    try {
        const newUrl = await ShortUrl.create({ fullUrl: fullUrl, shortUrl: short });
        res.send(newUrl);
    }
    catch (error) {
        res.send(error);
    }
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });
    if (shortUrl == null) {
        return res.sendStatus(404);
    }
    res.redirect(shortUrl.fullUrl);
})

app.listen(PORT, () => {
    console.log('Listening on port : ', PORT);
})