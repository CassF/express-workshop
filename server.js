const express = require("express");
const formidable = require("express-formidable");
const fs = require("fs");
const app = express();

app.use(formidable());
app.use(express.static("public"));

app.post("/create-post", function (req, res) {

    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        console.log(file);
        console.log(file.toString());
        let parsedFile = JSON.parse(file.toString());
        console.log("parsed file" + typeof parsedFile);
        parsedFile[Date.now()] = req.fields.blogpost;
        console.log(">>>>>>>>>>>>>>>>>>>>>>>", JSON.stringify(parsedFile))
        fs.writeFile(__dirname + '/data/posts.json', JSON.stringify(parsedFile), function (error) {
            console.log("I'm here");
            res.sendFile(__dirname + '/public/index.html')

        });
    });
});


app.get("/get-posts", function (req, res) {
    res.sendFile(__dirname + '/data/posts.json')
});


app.listen(3000, function () {
    console.log('Server is listening on port 3000. Ready to accept requests!');
});
