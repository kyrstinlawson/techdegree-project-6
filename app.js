const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const {projects} = require("./data.json");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res) => {
    res.render("index", {projects});
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/project/:id", (req, res, next) => {
    const {id} = req.params;
    if (projects[id]) {
        res.render("project", {project: projects[id]});
    } else {
        next();
    }
});

app.use((req, res, next) => {
    const err = new Error("This page does not exist");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render("page-not-found", {err});
        console.log(`Error ${err.status}: ${err.message}`);
    } else {
        res.render("error", {err});
        console.log(`Error ${err.status}: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log("This application is running on localhost:3000!");
});


