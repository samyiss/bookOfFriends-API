module.exports = {
    // method of operation
    put: {
      tags: ["Utilisateurs"], // operation's tag.
      summary: "Route pour mettre à jour le mot de passe", // operation's desc.
      operationId: "UpdatePassword", // unique operation id.
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [ ], // expected params.
      requestBody:{
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/PasswordPayload", // user data model   
            },
          },  
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "mot de passe mis à jour", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessMessage", // user data model
              },
            },
          },
        },
        // response code
        401: {
            description: "réponse si l'utilisateur n'est pas connecteé", // response desc.
            content: {
                // content-type
                "application/json": {
                schema: {
                    $ref: "#/components/schemas/ErrorMessage", // user data model
                },
                },
            },
            },
        // response code
        400: {
          description: "réponse si un des mots de passe est manquant", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
        // response code
        403: {
            description: "réponse si le mot de passe est mauvais", // response desc.
            content: {
              // content-type
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/ErrorMessage", // error data model
                },
              },
            },
          },
        // response code
        500: {
          description: "non vérifier", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // error data model
              },
            },
          },
        },
      },
    },
  };