const express = require("express");
const bodyParser = require("body-parser");
const template = require("./lib/template.js");
const fs = require("fs");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  fs.readdir("./page", (error, filelist) => {
    var list = filelist.map((item) => item.substring(0, item.lastIndexOf(".")));
    var html = template.homePage(list);
    res.send(html);
  });
});

app.get("/book/add", (req, res) => {
  var html = template.addPage();
  res.send(html);
});

app.get("/book/:pageId", (req, res) => {
  fs.readFile(`page/${req.params.pageId}.txt`, "utf8", function (err, description) {
    var html = template.bookInfoPage(req.params.pageId, description);
    res.send(html);
  });
});

app.post("/book/add", (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const publisher = req.body.publisher;
  const year = req.body.year;
  const data = `제목: ${title}
저자: ${author}
출판사: ${publisher}
출판년도: ${year}`;
  fs.writeFile(`./page/${title}.txt`, data, "utf8", function (error) {
    res.redirect("/");
  });
});

app.get("/book/edit/:pageId", (req, res) => {
  fs.readFile(`page/${req.params.pageId}.txt`, "utf8", function (err, description) {
    var info = description.split("\n");
    var title = info[0].split(": ")[1];
    var author = info[1].split(": ")[1];
    var publisher = info[2].split(": ")[1];
    var year = info[3].split(": ")[1];
    var html = template.editPage(title, author, publisher, year);
    res.send(html);
  });
});

app.post("/book/edit", (req, res) => {
  var oldTitle = req.body.originalTitle;
  var newTitle = req.body.title;
  var author = req.body.author;
  var publisher = req.body.publisher;
  var year = req.body.year;
  var data = `제목: ${newTitle}
저자: ${author}
출판사: ${publisher}
출판년도: ${year}`;
  fs.rename(`./page/${oldTitle}.txt`, `./page/${newTitle}.txt`, function (err) {
    fs.writeFile(`./page/${newTitle}.txt`, data, "utf8", function (error) {
      res.redirect("/book/" + newTitle);
    });
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
