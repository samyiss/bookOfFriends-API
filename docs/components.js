module.exports = {
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer", 
          bearerFormat: "JWT"
        }
      },
      parameters: {
        
      },
      schemas: {
        // modele pour connexion
        TokenCreationPayload: {
          type: "object",
          required: ["courriel", "mdp"],
          properties: {
            courriel: {
              type: "string",
            },
            mdp: {
              type: "string",
            },
          },
          example: {
              courriel: "samylichine.iss@gmail.com",
              mdp: "E2072931",
            },
        },
        // modele de token
        TokenCreationResponse: {
          type: "object", // type of the object
          required: ["token"],
          properties: {
            token: {
              type: "string",
            },
          },
          example: {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjIsIm5hbWUiOiJNYXJpZSBDdXJpZSIsImVtYWlsIjoibWFjdXJpZUBzY2llbmNlLmNvbSIsImlhdCI6MTYxOTIyNjkxNn0.Nn0SP4ZzW4jaOu_Q47Cq-NPm545zfxJmY7ww7GWyJL0"
            },
        },
        // modele pour inscription
        UserCreationPayload: {
          type: "object",
          required: ["nom", "prenom", "adresse", "ville", "codePostal", "pays", "province", "telephone", "courriel", "E2072931", "ddn"],
          properties: {
            nom: {
              type: "string",
            },
            prenom: {
              type: "string",
            },
            adresse: {
              type: "string",
            },
            ville: {
              type: "string",
            },
            codePostal: {
              type: "string",
            },
            pays: {
              type: "string",
            },
            province: {
              type: "string",
            },
            telephone: {
              type: "string",
            },
            courriel: {
              type: "string",
            },
            mdp: {
              type: "string",
            },
            ddn: {
              type: "string",
            },
          },
          example: {
            nom: "issiakhem",
            prenom: "Samy",
            adresse: "123 rue de la paix",
            ville: "Montr??al",
            codePostal: "H3H 3H3",
            pays: "Canada",
            province: "Qu??bec",
            telephone: "514-123-4567",
            courriel: "samylichine.iss@gmail.com",
            mdp: "E2072931",
            ddn: "1990-01-01",
          },
        },

        // modele pour inscription
        UserUpdatePayload: {
          type: "object",
          required: ["nom", "prenom", "adresse", "ville", "codePostal", "pays", "province", "telephone", "ddn"],
          properties: {
            nom: {
              type: "string",
            },
            prenom: {
              type: "string",
            },
            adresse: {
              type: "string",
            },
            ville: {
              type: "string",
            },
            codePostal: {
              type: "string",
            },
            pays: {
              type: "string",
            },
            province: {
              type: "string",
            },
            telephone: {
              type: "string",
            },
            ddn: {
              type: "string",
            },
          },
          example: {
            nom: "issiakhem",
            prenom: "Samy",
            adresse: "123 rue de la paix",
            ville: "Montr??al",
            codePostal: "H3H 3H3",
            pays: "Canada",
            province: "Qu??bec",
            telephone: "514-123-4567",
            ddn: "1990-01-01",
          },
        },



        // modele de input pour le mot de passe
        PasswordPayload: {
          type: "object", // data-type
          required: ["password", "new_password", "conf_passowrd"], // required fields
          properties: {
            password: {
              type: "string", // data-type
            },
            new_password: {
              type: "string", // data-type
            },
            conf_passowrd: {
              type: "string", // data-type
            }
          },
          example: {
            password: "e2072931",
            new_password: "E1234567-89",
            conf_password: "E1234567-89",
          },
        },

        // modele de input pour le courriel
        EmailPayload: {
          type: "object", // data-type
          required: ["courriel"], // required fields
          properties: {
            courriel: {
              type: "string", // data-type
            },
          },
          example: {
            courriel: "samylichine.iss@gmail.com"
          },
        },
      
      
        // message de succes
        SuccessMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message de succ??s descriptif",
            success: true,
          },
        },

        
      



        // message d'erreur
        ErrorMessage: {
          type: "object",
          required: ["message"],
          properties: {
            message: {
              type: "string", // data-type
            },
            success: {
              type: "boolean", // data-type
            },
          },
          example: {
            message: "Un message d'erreur descriptif",
            success: false,
          },
        },
      },
    },
  };
  