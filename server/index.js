const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => {
    console.log('db connected');
  })
  .catch(e => {
    console.log('Error, exiting', e);
    process.exit();
  });

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build/')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./app/routes/authAdmin.routes.js')(app);
require('./app/routes/authUser.routes.js')(app);
require('./app/routes/answer.routes.js')(app);
require('./app/routes/character.routes.js')(app);
require('./app/routes/question.routes.js')(app);
require('./app/routes/act.routes.js')(app);
require('./app/routes/reaction.routes.js')(app);
require('./app/routes/subreaction.routes.js')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build/', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`Server luistert op poort ${process.env.PORT}`);
});
