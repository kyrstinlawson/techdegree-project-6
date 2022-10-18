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
    if (id < projects.length) {
        res.render("project", {project: projects[id]});
    } else {
        const err = new Error();
        err.status = 404;
        err.message = "This page does not exist";
        res.render("page-not-found", {err}, console.log(`Error ${err.status}: ${err.message}`));
    }
});

app.use((err, req, res, next) => {
    console.log(err.status);
});

app.listen(3000, () => {
    console.log("This application is running on localhost:3000!");
});


