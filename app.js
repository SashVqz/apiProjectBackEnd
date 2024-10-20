const express = require("express")
const cors = require("cors")
const morganBody = require("morgan-body")
const swaggerUi = require("swagger-ui-express")

require("dotenv").config();
const swaggerSpecs = require("./docs/swagger")
const loggerStream = require("./utils/handleLogger")
const dbConnect = require("./config/mongo")

const app = express()

app.use(cors()) 
app.use(express.json())

morganBody(app, { 
  noColors: true, 
  skip: function(req, res) {
    return res.statusCode < 400
  },
  stream: loggerStream
})

// http://localhost:3000/api-docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs))
app.use("/api-user", require("./routes/user")) 
app.use("/api-shop", require("./routes/shop"))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server --- port:" + port)
})

dbConnect()

module.exports = app
