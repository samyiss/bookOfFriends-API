const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const docs = require('./docs');
const swaggerUi = require('swagger-ui-express');
const { loginUser, registerUser } = require('./database/user');

require("dotenv").config(); 

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended : false }));
router.use(bodyParser.json());

app.use(router);

router.use(cors());
router.use(express.json());

app.use('/',swaggerUi.serve, swaggerUi.setup(docs));

router.post('/auth/token', loginUser);
router.post('/auth/register', registerUser);


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});