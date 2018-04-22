const express = require("express");
const fs = require("fs");
const csv = require("csv-parser");
const MessageDAO = require("../db/messages");

const router = express.Router();

router.get("/", (req, res) => {
    if(req.isAuthenticated()){
        let dao = new MessageDAO();
        dao.select((result) => {
            res.send(result);
        });
    }else{
        res.status(401);
        res.send("Not Authorized");
    }
});

router.post("/", (req, res) => {
    if(req.isAuthenticated()){
        const title = req.fields.title;
        const description = req.fields.description;
        const file = req.files.story;
        if(file && title && description){
            const messages = [];

            fs.createReadStream(file.path)
                .pipe(csv({
                    raw: false,
                    separator: ";",
                    newline: "\n",
                    strict: true
                }))
                .on("data", (data) => {
                    messages.push(data);
                })
                .on("end", () => {
                    let story = {
                        title: title,
                        description: description,
                        messages: messages
                    };

                    new MessageDAO().insert(
                        story, (result) => {
                            console.log(result);
                            res.redirect("/");
                        }
                    );
                });

        }else{
            res.status(400);
            res.send("Incomplete Form Data");
        }
    }else{
        res.status(401);
        res.send("Not Authorized");
    }
});

module.exports = router;