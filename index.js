const express = require("express");
const path = require("path");
const people = require("./api/peoples");
const logger = require("./Middleware/logger");

let app = express();

//Body Parser Middleware
app.use(express.json());

app.use(express.urlencoded({extended:false}));

app.use(logger);

app.use(express.static(path.join(__dirname,'public')));

app.use("/api/people", require("./routs/api/api"));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server is running on port ${PORT}`));