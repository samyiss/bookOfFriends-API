module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs"], // operation's tag.
      security: [
        {
          bearerAuth: []
        }
      ],
      summary: "Modifie le courriel de l'utilisateur connecté", // operation's desc.
      operationId: "updateEmail", // unique operation id.
      requestBody:  {
        required: true, // Mandatory param
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/EmailPayload", // user data model            
            },
          }, 
        },
      },
      // expected responses
      responses: {
        // response code
        201: {
          description: "Courriel mis à jour", // response desc.
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
          description: "réponse si aucun courriel n'est entré ou si l'email est invalide", // response desc.
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
        409: {
          description: "La réponse si l'email que l'utilisateur donne se trouve déja dans la base de données (déja utilisé)", // response desc.
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