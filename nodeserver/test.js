const express = require('express');
//const bodyParser = require('body-parser');
const app = express();
const port = 3000

let people = [{ firstname: "bob", lastname: "jones"}, {firstname: "york", lastname: "gettersberg"}];


app.use(express.urlencoded({ extended: false}));

function htmlStart(res){
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>`);
}
function htmlEnd(res){
    res.send(`
</body>
</html>`)
}


app.get('/person/:index', (req,res) => {
    console.log(req.params)
    res.send("Hi: "+ req.params.index)
})

app.get('/', (req, res) => {
    console.log(req.query.firstname);
    htmlStart(res, "woah");
    res.write(`
    <p> ayo ${req.query.firstname}</p>
    <p> yoooooo ${req.query.lastname}</p>`);

    htmlEnd(res);
});

app.post('/', (req, res) => {
    people.push({firstname: req.body.firstname, lastname: req.body.lastname});
    htmlStart(res, "something cool");
    res.write(`
        <p> ayo ${req.body.firstname}</p>
        <p> yoooooo ${req.body.lastname}</p>
        `);
        for(let w of people){
            res.write(`<p>${w.firstname} ${w.lastname}</p>`);
        }
        res.write(`<form method = "post" action = "http://localhost:3000" 
        <label for = "button"> delete </label>`);

        htmlEnd(res);
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});
