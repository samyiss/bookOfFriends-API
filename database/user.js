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
                telephone: Tel,
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
                                   photoURL: user.providerData[0].photoURL,
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