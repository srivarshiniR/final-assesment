const express = require('express');
const app = express();
const dbdetails = require('./db')

const router=require('./router');
const port=5000;

app.use(express.json())

app.use(router);


app.listen(port,()=> console.log('server started'));

