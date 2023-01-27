module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs"], // operation's tag.
      summary: "Route pour créer un utilisateur", // operation's desc.
      operationId: "registerUser", // unique operation id.
      parameters: [], // expected params.
      requestBody:{
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/UserCreationPayload", // user data model   
            },
          },  
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "La réponse lorsque l'utilisateur est créé", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/SuccessMessage", // User model
              },
            },
          },
        },
        // response code
        409: {
          description: "La réponse si l'email que l'utilisateur donne se trouve déja dans la base de données aka a deja un compte", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ErrorMessage", // User model
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