const express = require('express');
const { router } = require('./router'); 
const { med } = require('./router/medicine');
const cors = require('cors')
const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/company', router);
app.use('/medicine', med);

app.listen(8080);