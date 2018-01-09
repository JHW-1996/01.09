const express = require('express');
const static = require('express-static');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();
const fs =require('fs')
var formidable=require('formidable'); 

app.listen(8002);

app.use(bodyParser.urlencoded({}));

app.use('/index',index);





app.use(static('./public'));