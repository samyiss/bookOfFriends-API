module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs"], // operation's tag.
      summary: "Obtenir un jeton d'authentification", // operation's desc.
      operationId: "loginUser", // unique operation id.
      parameters: [], // expected params.
      requestBody:  {
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/TokenCreationPayload", // user data model            
            },
          }, 
        },
      },
      // expected responses
      responses: {
        // response code
        200: {
          description: "Le jeton", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/TokenCreationResponse", // user data model
              },
            },
          },
        },
        // response code
        403: {
          description: "réponse si le mot de passe fourni n'est pas correct", // response desc.
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
        404: {
          description: "réponse si l'utilisateur n'est pas trouvé", // response desc.
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
        400: {
          description: "réponse si le paramétre est invalide ou manque de données", // response desc.
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
          description: "réponse si le serveur a rencontré une situation qu'il ne sait pas gérer", // response desc.
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