const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes/index');
const items = require('./routes/items');
const suppliers = require('./routes/suppliers');

app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());

app.set('views', __dirname+'/views/');
app.set('view engine', 'ejs');

//body parser
app.use(bodyParser.urlencoded({
  extended: false
}))
//routes
app.use('/', router);
app.use('/items', items);
app.use('/suppliers', suppliers);

const port = process.env.PORT || 4000;

app.listen(port, function() {
  console.log(`Server Starts on ${port}`);
});
