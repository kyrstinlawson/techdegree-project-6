const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const {projects} = require("./data.json");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index", {projects});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res) => {
    const {id} = req.params;
    res.render("project", {projects});
});

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    err.message = "Page not found";
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
});

app.listen(3000, () => {
    console.log("This application is running on localhost:3000!");
});


