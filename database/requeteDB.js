const knexModule = require('knex');
const chaineConnexion = require('./dbConnexion');

const knex = knexModule(chaineConnexion);


module.exports = {
    getAvis: async (idDist) => {
        try {
            var MongoClient = require('mongodb').MongoClient;
            var url = "mongodb+srv://samy:Yasama67@cluster0.b8ncslx.mongodb.net/test";

            const db = MongoClient.connect(url)
            var dbo = db.db("book-of-friends");
            
            const book = dbo.collection("books")
            const j = book.find({isbn:"9781593279509"})

            console.log(j)
            const avis = await knex('avis').where('id_service', idDist);
            return avis;
        } catch (error) {
            console.log(error);
        }
    }
};
