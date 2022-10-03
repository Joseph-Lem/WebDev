const { appendFile } = require("fs");
const express = require('express');
const app = express();
const port = 3000

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

let userInfo = [{firstname:" ", lastname: "", username: "", password:""}];

function htmlStart(res){
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>`);
}
function htmlEnd(res){
    res.write(`
</body>
</html>`)
res.end();
}

app.post('/login', (req, res) => {
    console.log(req.body.username);
    console.log(req.body.password);
    htmlStart(res, "something cool");
    htmlEnd(res);
});
app.post('/register', (req, res) => {
    console.log(req.body.firstname);
    console.log(req.body.lastname);
    console.log(req.body.username);
    console.log(req.body.password);
    userInfo.push({firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            username: req.body.username, 
            password: req.body.password});
    console.log(userInfo);
    htmlStart(res, "something cool");
    htmlEnd(res);
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});