
const { checkFavorisUser, checkFavorisService, deleteFavorisUser, deleteFavorisService, addFavoris, getFavorites } = require("./requeteKnex");
const { getAuth } = require("firebase/auth");
const { fapp } = require('./firebaseconf');
const { getService} = require("./requeteKnex");
const { get, child, ref, getDatabase } = require("firebase/database");


exports.getAllFavoris = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    if (user !== null) {

        try{
            const favorites = await getFavorites(user.uid);

            let favUsers = [];
            let favServices = [];

            for (const favorite of favorites) {
                if (favorite.id_favService !== null) {
                    const service = await getService(favorite.id_favService)
                    favServices.push({
                        Id_service: service[0].id_service,
                        nomService: service[0].nomService,
                        prix: service[0].prix,
                        photoCouverture: service[0].photoCouverture,
                        datePublication: service[0].datePublication,
                    });
                }
                if (favorite.id_favUser !== null) {
                    const user = await get(child(database, `users/${favorite.id_favUser}`))
                    favUsers.push({
                        id_client: user.key,
                        nomClient: user.val().nom_user,
                        prenomClient: user.val().prenom_user,
                        photoProfil: user.val().photoProfil,
                    })  
                }
            };
            return res.status(200).json( { users: favUsers, services: favServices } );
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenue avec le serveur" });
        }

    } else {
        return res.status(401).json({ success: false, message: "vous n'êtes pas connecté" });
    }
}

exports.addfavoris = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    if (user !== null) {
        const { idUser, idService } = req.query;

        try {

            if (idUser === undefined && idService === undefined)
                return res.status(400).json({ success : false, message: 'paramètre manquant'});

            if (idUser !== undefined && idService !== undefined)
                return res.status(400).json({ success : false, message: 'paramètre en trop'});

            if (idService !== undefined){
                const service = await getService(idService);
                if (service.length === 0)
                    return res.status(404).json({ success : false, message: 'auncun service trouvé'});
                
                try {
                    const fav = {
                        id_user: user.uid,
                        id_favService: idService,
                    }
                    await addFavoris(fav);
                    return res.status(201).json({ success : true, message: 'service ajouté aux favoris'});
                } catch (error) {
                    return res.status(500).json({ success : false, message: 'une erreur est survenue lors de l\'ajout du service des favoris'});
                }
            }

            if (idUser !== undefined){
                get(child(database, `users/${idUser}`)).then(async (data) => {
                    if (data.exists()) {  
                        try {
                            const fav = {
                                id_user: user.uid,
                                id_favUser: idUser,
                            }
                            await addFavoris(fav);
                            return res.status(201).json({ success : true, message: 'utilisateur ajouté aux favoris'});
                        } catch (error) {
                            return res.status(500).json({ success : false, message: 'une erreur est survenue lors de l\'ajout de l\'utilisateur des favoris'});
                        }
                    } else{
                        res.status(404).send({
                            success: false,
                            message: "l'utilisateur n'existe pas",
                        });
                    }
                }).catch(() => {
                    res.status(500).send({
                        success: false,
                        message: "une erreur est survenue lors de la récupération de l'utilisateur",
                    });
                });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenue avec le serveur" });
        }
    } else {
        return res.status(401).json({ success: false, message: "vous n'êtes pas connecté" });
    }
}

exports.deleteFavoris = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    if (user !== null) {
        const { idUser, idService } = req.query;

        try {

            if (idUser === undefined && idService === undefined)
                return res.status(400).json({ success : false, message: 'paramètre manquant'});

            if (idUser !== undefined && idService !== undefined)
                return res.status(400).json({ success : false, message: 'paramètre en trop'});

            if (idService !== undefined){
                const service = await getService(idService);
                if (service.length === 0)
                    return res.status(404).json({ success : false, message: 'auncun service trouvé'});
                
                try {
                    await deleteFavorisService(user.uid, idService);
                    return res.status(200).json({ success : true, message: 'service supprimé des favoris'});
                } catch (error) {
                    return res.status(500).json({ success : false, message: 'une erreur est survenue lors de la suppression du service des favoris'});
                }
            }

            if (idUser !== undefined){
                get(child(database, `users/${idUser}`)).then(async (data) => {
                    if (data.exists()) {  
                        try {
                            await deleteFavorisUser(user.uid, idUser);
                            return res.status(200).json({ success : true, message: 'utilisateur supprimé des favoris'});
                        } catch (error) {
                            return res.status(500).json({ success : false, message: 'une erreur est survenue lors de la suppression de l\'utilisateur des favoris'});
                        }
                    } else{
                        res.status(404).send({
                            success: false,
                            message: "l'utilisateur n'existe pas",
                        });
                    }
                }).catch(() => {
                    res.status(500).send({
                        success: false,
                        message: "une erreur est survenue lors de la récupération de l'utilisateur",
                    });
                });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenue avec le serveur" });
        }
    } else {
        return res.status(401).json({ success: false, message: "vous n'êtes pas connecté" });
    }
}

exports.checkFavoris = async(req,res) =>{

    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    if (user !== null) {
        const { idUser, idService } = req.query;

        try {

            if (idUser === undefined && idService === undefined)
                return res.status(400).json({ success : false, message: 'paramètre manquant'});

            if (idUser !== undefined && idService !== undefined)
                return res.status(400).json({ success : false, message: 'paramètre en trop'});

            if (idService !== undefined){
                const service = await getService(idService);
                if (service.length === 0)
                    return res.status(404).json({ success : false, message: 'auncun service trouvé'});
                const favoris = await checkFavorisService(user.uid, idService);
                if (favoris.length === 0)
                    return res.status(200).json({ isFavorite : false });
                return res.status(200).json({ isFavorite : true });
            }

            if (idUser !== undefined){
                get(child(database, `users/${idUser}`)).then(async (data) => {
                    if (data.exists()) {         
                        const favoris = await checkFavorisUser(user.uid, idUser);
                        if (favoris.length === 0)
                            return res.status(200).json({ isFavorite : false });
                        return res.status(200).json({ isFavorite : true });
                    } else{
                        res.status(404).send({
                            success: false,
                            message: "l'utilisateur n'existe pas",
                        });
                    }
                }).catch(() => {
                    res.status(500).send({
                        success: false,
                        message: "une erreur est survenue lors de la récupération de l'utilisateur",
                    });
                });
            }
        } catch (error) {
            return res.status(500).json({ success: false, message: "une erreur est survenue avec le serveur" });
        }
    } else {
        return res.status(401).json({ success: false, message: "vous n'êtes pas connecté" });
    }
}
