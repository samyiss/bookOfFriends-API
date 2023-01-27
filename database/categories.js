
const { getAllCategories, getCategorieById } = require("./requeteKnex");

exports.getAllCategories = async(req,res) =>{
    try {
        const categories = await getAllCategories();
        if(categories !== []) {
            let data = [];
            categories.forEach((categorie) => {
                dataDisplay = {
                    idCategorie: categorie.id_categorie,
                    nomCategorie: categorie.nom_categorie,
                    imgCategorie: categorie.img_categorie,
                }
                data.push(dataDisplay);
            });
            return res.status(200).json( data );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de la récupération des categorie" });
    }
}

exports.getCategorieById = async(req,res) =>{
    try {
        const categorie = await getCategorieById(req.params.idCategorie);
        if(categorie.length !== 0) {
            let data = [];
            categorie.forEach((cat) => {
                dataDisplay = {
                    idCategorie: cat.id_categorie,
                    nomCategorie: cat.nom_categorie,
                    imgCategorie: cat.img_categorie,
                }
                data.push(dataDisplay);
            });
            return res.status(200).json( data );
        } else {
            return res.status(404).json({ success: false, message: "aucune categorie trouvé" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: "une erreur est survenue lors de la récupération des categorie" });
    }
}