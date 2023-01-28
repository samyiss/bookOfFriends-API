const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const docs = require('./docs');
const swaggerUi = require('swagger-ui-express');
const { loginUser, registerUser, getUser, update_Password, resetPassword, deleteUser, updateProfile, updateEmail } = require('./database/user');

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
router.get('/user', getUser)
router.put('/user/update-password', update_Password)
router.put('/user/update-email', updateEmail)
router.post('/user/password-oublie', resetPassword)
router.delete('/user', deleteUser)
router.put('/user', updateProfile)


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`L'API peut maintenant recevoir des requêtes http://localhost:` + port);
});