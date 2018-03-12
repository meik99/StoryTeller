const express = require("express");
const fs = require("fs");
const MessageDAO = require("../db/messages");

const router = express.Router();

router.get("/", (req, res) => {
    if (!req.user) {
        res.redirect("/login");
    } else {
        res.render("story", {});
    }
});

router.post("/", (req, res) => {
    if (req.isAuthenticated() === false) {
        res.redirect("/login");
    } else {
        let file = req.files.fileUpload;
        console.log(req.files.fileUpload.path);
        fs.readFile(file.path, "utf8", (err, data) => {
            if (err) console.log(err);

            let messageLines = data.split("\n");
            let messages = [];

            messageLines.forEach((item) => {
                messages.push(item.split(","));
            });

            let dao = new MessageDAO();
            dao.insert(req.fields.title, messages, (result) => {
                "use strict";
                console.log(result);
                res.redirect("/story");
            });
        });
    }
});

module.exports = router;
