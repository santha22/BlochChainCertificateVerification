require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./router/auth-router");
const connectDB = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');

const corsOptions = {
    origin: "http://localhost:3000",
    method: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentils: true
}

app.use(cors(corsOptions));

app.use(express.json());

app.use("/api/auth", router);

app.use(errorMiddleware);



const PORT = 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server is running at port: ${PORT}`);
    })

});