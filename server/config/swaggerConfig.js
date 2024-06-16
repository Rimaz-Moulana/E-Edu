const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Your API Title",
      version: "1.0.0",
      description: "Your API description",
    },
  },
  apis: ["../src/routes/*.js"], // Path to the API routes files to be documented ----> apis: ["./routes/*.js"] 
};

const specs = swaggerJsdoc(options);

module.exports = specs;
