const express = require('express');
const app = express();

const rotaAnimais = require('./routes/animais')

app.use('/animais', rotaAnimais);



module.exports = app;

