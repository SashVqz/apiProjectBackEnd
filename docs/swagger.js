const swaggerJsdoc = require("swagger-jsdoc")

/**
 * 
 * Document for the API with Swagger (OpenAPI 3.0)
 * 
**/

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "PF Alvaro Vazquez - Express API with Swagger (OpenAPI 3.0)",
      version: "0.1.0",
      description: "This is a CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Sash _UWU_",
        email: "alvaro.vazquez@live.u-tad.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        url: "http://localhost:3000/api-shop",
        url: "http://localhost:3000/api-user",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer"
        },
      },
      schemas:{
        Review: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "uuid",
            },
            score: {
              type: "number",
              minimum: 1,
              maximum: 5,
              example: 4
            },
            text: {
              type: "string",
              example: "Great product!"
            },
          },
          required: ["score", "text"],
        },
        WebShop: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "uuid",
            },
            title: {
              type: "string",
              example: "My WebShop"
            },
            summary: {
              type: "string",
              example: "This is a summary of my webshop."
            },
            texts: {
              type: "array",
              items: {
                type: "string",
                example: "Text item"
              },
            },
            photos: {
              type: "array",
              items: {
                type: "string",
                example: "http://example.com/photo.jpg"
              },
            },
            scoring: {
              type: "number",
              default: 0,
              example: 3.5
            },
            numRatings: {
              type: "number",
              default: 0,
              example: 10
            },
            reviews: {
              type: "array",
              items: {
                $ref: "#/components/schemas/Review",
              },
            },
          },
          required: ["title", "summary", "texts", "photos"],
        },
        Shop: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
              example: "My Shop"
            },
            password: {
              type: "string",
              example: "securepassword"
            },
            cif: {
              type: "string",
              uniqueItems: true,
              example: "A12345678"
            },
            city: {
              type: "string",
              example: "Madrid"
            },
            email: {
              type: "string",
              example: "shop@example.com"
            },
            phone: {
              type: "string",
              example: "+34123456789"
            },
            activity: {
              type: "string",
              example: "Retail"
            },
            webShop: {
              $ref: "#/components/schemas/WebShop",
            },
          },
          required: ["name", "password", "cif", "city", "email", "phone", "activity", "webShop"],
        },
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              format: "uuid",
            },
            name: {
              type: "string",
              example: "John Doe"
            },
            email: {
              type: "string",
              example: "john.doe@example.com"
            },
            password: {
              type: "string",
              example: "securepassword"
            },
            age: {
              type: "string",
              example: "30"
            },
            city: {
              type: "string",
              example: "Madrid"
            },
            interests: {
              type: "string",
              example: "Programming, Music"
            },
            allowsReceivingOffers: {
              type: "boolean",
              example: true
            },
            role: {
              type: "string",
              enum: ["admin", "usuario", null],
              default: null,
              example: "admin"
            },
          },
          required: ["email", "password"],
        },
      },
    },
  },
  apis: ["./routes/user.js", "./routes/shop.js"],
};

module.exports = swaggerJsdoc(options)