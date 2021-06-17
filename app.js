if(process.env.NODE_ENV != 'production') {
    require('dotenv').config();
}
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routs/index');

const app = express();

app.set('view engine', 'ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection
db.on('err', error => console.error(err));
db.once('open', () => console.log('conected to mongoose'));



app.use('/', indexRouter);

app.listen(process.env.PORT || 3000, ()=> {
    console.log('listining on port 3000');
});