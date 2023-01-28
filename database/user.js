const { getAuth, signInWithEmailAndPassword, sendEmailVerification, updateEmail, createUserWithEmailAndPassword, deleteUser, sendPasswordResetEmail, updatePassword, EmailAuthProvider, reauthenticateWithCredential, updateProfile, updatePhoneNumber} = require("firebase/auth");
const { getDatabase, ref, set, get, child, remove } = require("firebase/database");
const { fapp } = require('./firebaseconf');


function validateCourriel(email){
    const expression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    return expression.test(email) ? true : false
}

function validateMDP(password){
    const regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g
    return regex.test(password) ? true : false
}

exports.registerUser = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);

    const { nom, prenom, adresse, ville, codePostal, pays, province, telephone, courriel, mdp, ddn } = req.body;

    if(nom && prenom && validateCourriel(courriel) && validateMDP(mdp) && telephone && province &&
        adresse && ville && codePostal && pays && ddn){
        await createUserWithEmailAndPassword(auth, courriel, mdp)
        .then(() => {
            updateProfile(auth.currentUser, {
                displayName: `${nom} ${prenom}`,
            })
        })
        .then(() => {
            const user = auth.currentUser;
            const user_data =  {
                numDossier: user.uid,
                nom: nom,
                prenom: prenom,
                courriel: courriel,
                telephone: telephone,
                adresse: adresse,
                ville: ville,
                codePostal: codePostal,
                pays: pays,
                province: province,
                ddn: ddn,
            } 
            set(child(database, `users/${user.uid}`), user_data)
            .then(()=>{
                res.status(201).send({
                    success:true,
                    message: `Utilisateur créé`,
                })
            })
            .catch(() => {
                switch(error.code) {
                    case "auth/invalid-email":
                        res.status(400).json({ 
                            success: false,
                            message: "email invalide"
                        });
                        break;
                    case "auth/email-already-in-use":
                        res.status(409).json({ 
                            success: false,
                            message: "L'utilisateur existe déjà"
                        });
                        break;
                    default:
                        res.status(500).json({ 
                            success: false,
                            message: "Erreur lors de la création de l'utilisateur"
                         });
                }   
            })
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/email-already-in-use":
                    res.status(409).json({ 
                        success: false,
                        message: "L'utilisateur existe déjà"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "Erreur lors de la création de l'utilisateur"
                     });
            }   
        })  
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez vérifier tous les champs'
        })
    }
}

exports.loginUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const auth = getAuth(fapp);


    if(email !== "" && password !== ""){
        
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            res.status(200).json({ token: user.stsTokenManager.accessToken,
                                   id: user.uid,
                                   name: user.providerData[0].displayName,
                            });
        }).catch((error) => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                    });
                    break;
                case "auth/wrong-password":
                    res.status(403).json({
                        success: false,
                        message: "Le mot de passe est incorrect"
                    });
                  break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: error
                     });
                }   
        });
    }else{
        res.status(400).json({ success:false, message: "Email ou mot de passe manquant" });
    }
}


exports.getUser = async (req, res) => {
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    if(user !== null){
        get(child(database, `users/${user.uid}`)).then(async (data) => {
            if (data.exists()) {
                const snapshot = data.val();  

                return res.status(200).send(snapshot);
                    
            } else{
                res.status(404).send({
                    success: false,
                    message: "l'utilisateur n'existe pas",
                });
            }  
        }).catch((error) => {
            res.status(500).send({
                success: false,
                message: error,
            });
        });
    }else{
        res.status(401).send({
            success: false,
            message: "Vous devez être connecté",
        });
    }
}

exports.update_Password = async(req,res) =>{
    const auth = getAuth(fapp);
    const user = auth.currentUser;
    const password = req.body.password;
    const new_password = req.body.new_password;
    const conf_password = req.body.conf_password;

    if(password !== "" && validateMDP(new_password) && new_password !== conf_password) {
        return res.status(400).send({
            success:true,
            message: `veuillez vérifier les champs d'entrés et que les deux mots de passes sont pas les memes`,
        });
    }

    if(user !== null){
        var credential = EmailAuthProvider.credential(
                                user.email,
                                password
                            );
        
        await reauthenticateWithCredential(user, credential).then( async () => {
            await updatePassword(user, new_password)
            .then(()=>{
                return res.status(201).send({
                    success:true,
                    message: `mot de passe mis à jour`,
                });
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/wrong-password":
                        return res.status(400).json({ 
                            success: false,
                            message: "le mot de passe actuel est mauvais"
                        });
                    case "auth/user-not-found":
                        return res.status(401).json({ 
                            success: false,
                            message: "vous n\'êtes pas connecté"
                        });
                    default:
                        return res.status(500).json({ 
                            success: false,
                            message: 'une erreur est survenue'
                        });
                    }
            })
        }).catch(() => {
            return res.status(500).json({ 
                success: false,
                message: 'une erreur est survenue'
            });
        });
    }
    else{
        return res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}

exports.resetPassword = async(req,res) =>{
    const auth = getAuth(fapp);
    const email = req.body.email

    if(email !== ""){
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            res.status(201).send({
                success:true,
                message: `un e-mail vous a été envoyé avec les étapes à suivre pour modifier votre mot de passe`,
            });
        })
        .catch((error) => {
            switch(error.code) {
                case "auth/invalid-email":
                    res.status(400).json({ 
                        success: false,
                        message: "email invalide"
                    });
                    break;
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "veuillez verifier votre email"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: error
                    });
                }
        })
    }
    else{
        res.status(400).send({
            success:false,
            message:'veuillez entrer votre courriel pour continuer'
        })
    }
}

exports.deleteUser = async(req,res) =>{
    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    if(user !== null){
        await remove(child(database, `users/${user.uid}`), null)
        .then(()=>{
            deleteUser(user)
            .then(()=>{
                return res.status(201).send({
                    success:true,
                    message: `Utilisateur supprimé`,
                })
            })
            .catch(() => {
                res.status(500).send({
                    success:false,
                    message: "un problème est survenu lors de la supression de l'utilisateur"
                });
            });
        })
        .catch(() => {
            switch(error.code) {
                case "auth/user-not-found":
                    res.status(404).json({ 
                        success: false,
                        message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                    });
                    break;
                default:
                    res.status(500).json({ 
                        success: false,
                        message: "un problème est survenu lors de la supression de l'utilisateur"
                     });
                }   
        });
    } else{
        res.status(401).send({
            message: 'vous n\'êtes pas connecté',
        });
    }
}

exports.updateProfile = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    const { nom, prenom, adresse, ville, codePostal, pays, province, telephone, ddn } = req.body;

    if(user !== null){
        if(nom && prenom && telephone && province && adresse && ville && codePostal && pays && ddn){
            const user_data =  {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                adresse: adresse,
                ville: ville,
                courriel: user.email,
                codePostal: codePostal,
                pays: pays,
                province: province,
                ddn: ddn,
            }
            set(child(database, `users/${user.uid}`), user_data)
            .then(() => {
                return res.status(201).send({
                    success:true,
                    message: `vos informations ont été mis à jours`,
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({ 
                            success: false,
                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                        });
                        break;
                    default:
                        return res.status(500).send({ 
                            success: false,
                            message: "Erreur lors de la mis à jour de l'utilisateur"
                        });
                }
            })
        }
        else{
            return res.status(400).send({
                success:false,
                message:'veuillez vérifier ou remplier les champs nécessaires pour continuer'
            })
        }
    }
    else{
        return res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}


exports.updateEmail = async(req,res) =>{

    const database = ref(getDatabase());
    const auth = getAuth(fapp);
    const user = auth.currentUser;

    const {email} = req.body

    // mettre à jour les données de l'utilisateur
    if(user !== null){
        if(validateCourriel(email)){
            set(child(database, `users/${user.uid}/courriel`), email)
            .then(()=>{
                //update email
                updateEmail(user, email)
                .then(() => {
                    res.status(201).send({
                        success:true,
                        message: `courriel mis à jour`,
                    })
                })
                .catch((error) => {
                    switch(error.code) {
                        case "auth/invalid-email":
                            res.status(400).json({ 
                                success: false,
                                message: "vérifier le courriel saisi"
                            });
                            break;
                        case "auth/email-already-in-use":
                            res.status(409).json({ 
                                success: false,
                                message: "Le courriel entré est déja utilisé"
                            });
                            break;
                        default:
                            res.status(500).json({ 
                                success: false,
                                message: "Erreur lors de la mis à jour de l'utilisateur"
                             });
                    }   
                })
            })
            .catch((error) => {
                switch(error.code) {
                    case "auth/user-not-found":
                        res.status(404).json({ 
                            success: false,
                            message: "L'utilisateur n'existe pas veuillez verifier votre email ou créer un compte"
                        });
                        break;
                    default:
                        res.status(500).send({ 
                            success: false,
                            message: "Erreur lors de la mis à jour de l'utilisateur"
                        });
                }
            })
        }
        else{
            res.status(400).send({
                success:false,
                message:'veuillez vérifier ou remplier les champs nécessaires'
            })
        }
    }
    else{
        res.status(401).send({
            success:false,
            message:'vous n\'êtes pas connecté'
        })
    }
}
