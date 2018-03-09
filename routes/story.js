const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  if(!req.user){
    res.redirect("/login");
  }else{
    res.render("story", {});
  }
});

router.post("/", (req, res) => {
  if(req.isAuthenticated() == false){
    res.redirect("/login");
  }else{
    var file = req.
      files.
      fileUpload;
    console.log(req.files.fileUpload.path);
    fs.readFile(file.path, "utf8", (err, data) => {
      if(err) console.log(err);

      var messageLines = data.split("\n");
      var messages = new Array();

      messageLines.forEach((item) => {
        messages.push(item.split(","));
      });

      console.log(messages);


      res.redirect("/story");
    });
  }
});

module.exports = router;
