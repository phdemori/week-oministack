const express = require('express');
const cors = require('cors');
const routes = import('./routes');

const app = express();
app.use(cors());//{origin:'http://meuap.com'}
app.use(express.json());
app.use(routes);

app.listen(3333);


/*{
    "name":"APAD",
    "whatsapp":"0000000",
    "email":"email@apad.com",
    "city":"Gurupi",
    "uf":"TO"
}*/