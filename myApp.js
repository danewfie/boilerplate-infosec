const express = require('express');
const helmet = require('helmet');
const hidePoweredBy = require("hide-powered-by");
var timeInSeconds = 90*24*60*60;

const app = express();
app.use(helmet());
// Not required, but recommended for Express users:
app.disable("x-powered-by");

// Ask Helmet to ignore the X-Powered-By header.
app.use(hidePoweredBy({ setTo: 'PHP 4.2.0' }));
// Sets "X-Frame-Options: DENY"
app.use(helmet.frameguard({action: 'deny'}));
// sets xssFilter
app.use(helmet.xssFilter());

app.use(helmet.noSniff());

app.use(helmet.ieNoOpen());

app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));

app.use(helmet.dnsPrefetchControl());



































module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
