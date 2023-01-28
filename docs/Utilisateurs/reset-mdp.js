module.exports = {
    // method of operation
    post: {
      tags: ["Utilisateurs"], // operation's tag.
      summary: "mot de passe oublié", // operation's desc.
      operationId: "forgetPassword", // unique operation id.
      requestBody:{
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
          description: "instructions envoyés par courriel pour modifier le mot de passe", // response desc.
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
          description: "réponse si aucun email n'est donné", // response desc.
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
        404: {
          description: "réponse si l'email de l'utilisateur n'est pas trouvé", // response desc.
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