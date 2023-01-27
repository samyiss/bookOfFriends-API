const { getAllMessages, addMessage, getMessages } = require("./requeteDB");
const { getAuth } = require("firebase/auth");

const { fapp } = require('./firebaseconf');
const { get, child, ref, getDatabase } = require("firebase/database");

exports.getAllMessage = async(req, res) => {
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    if (user !== null) {
        let userMessage = [];

        const users = await getAllMessages(user.uid)
        if (users.length === 0) return res.status(404).send({ success: false, message: "aucun message à afficher" });

        try {
            users.forEach( (user) => {
                get(child(database, `users/${user}`)).then((data) => {
                    if (data.exists()) {
                        const snapshot = data.val();
                        userMessage.push({
                            Id_user: data.key,
                            nom_user: snapshot.nom_user,
                            prenom_user: snapshot.prenom_user,
                            photoProfil: snapshot.photoProfil,
                        })
                        return res.status(200).json(userMessage);
                    } 
                    else {
                        res.status(404).send({
                            success: false,
                            message: "l'utilisateur n'existe pas",
                        });
                    }
                })   
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}

exports.addMessage = async(req, res) => {
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const database = ref(getDatabase());

    const idReceive = req.params.idReceive

    const { txt_message } = req.body

    if (user !== null) {

        if (txt_message === undefined || idReceive === undefined) return res.status(400).json({ success: false, message: 'veuillez verifier les champs necessaires' });

        try {
            get(child(database, `users/${idReceive}`)).then(async (data) => {
                if (data.exists()) {
                    const message = {
                        id_send: user.uid,
                        id_receive: data.key,
                        txt_message: txt_message,
                        date_message: new Date().toLocaleString('fr-FR', 'Canada/Montréal'),
                    }
                    try {
                        await addMessage(message);
                        return res.status(201).json({ success: true, message: "Message envoyé" });
                    } catch (error) {
                        return res.status(500).json({ success: false, message: 'une erreur est survenue lors de l\'envoie' });
                    }    
                } else{
                    res.status(404).send({
                        success: false,
                        message: "l'utilisateur n'existe pas",
                    });
                } 
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}

exports.getMessageByUser = async(req, res) => {
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    const idReceive = req.params.idReceive

    if (user !== null) {

        if (idReceive === undefined) return res.status(400).json({ success: false, message: 'veuillez verifier les champs necessaires' });

        try {
            const messages = await getMessages(user.uid, idReceive)
            if (messages.length === 0) return res.status(404).send({ success: false, message: "aucun message à afficher" });
            return res.status(200).json({ success: true, messages: messages })
        } catch (error) {
            return res.status(500).json({ success: false, message: error });
        }
    } else {
        return res.status(401).json({ success: false, message: 'Vous n\'êtes pas connecté' });
    }
}