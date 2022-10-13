const { appendFile } = require("fs");
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
//cookies
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'sussyAmongus',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//firstname:" ", lastname: "", username: "", password:""
let userInfo = [{firstname:"joe", lastname:"lem", username: "lem", password:"joe"}];

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
// let userLoggedIn = false;

app.post('/login', (req, res) => {
    let enteredUsername = req.body.username;
    let enteredPassword = req.body.password;
    for(let x of userInfo){
        if ((enteredUsername === x.username) && (enteredPassword === x.password)){
            console.log('correct, youre logged in');
            //cool cookie stuff
            req.session.userid = req.body.username;
            console.log(req.session);
            req.session.userid.LoggedIn = true;
            res.redirect('LPBFW.html');
            return;
        }
        else{
        }
    }
    htmlStart(res, "something cool");
    res.write(
        "incorrect login or password, try again"
    );
    htmlEnd(res);
});
app.post('/register', (req, res) => {
    let alreadyTaken = false;
    for(let z of userInfo){
        let newUsername = req.body.username;
        if ((newUsername === z.username)){
            alreadyTaken = true;
        }
        else{
        }
    }
    if(!alreadyTaken){
        userInfo.push({firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            username: req.body.username, 
            password: req.body.password});
            res.redirect('login.html')
            return;
    }
    else{
        res.write("username taken try a new one.");
    }
    console.log(userInfo);
    htmlStart(res, "something cool");
    res.write('brody');
    htmlEnd(res);
});
app.post('/LPBFW', (req, res)=> {
    htmlStart(res, "yuh");
    htmlEnd(res);
});
app.post('/logout', (req, res) => {
    req.session.userid.LoggedIn = false;
    res.redirect('index.html');
    return;
});
app.use('/LPBFW', (req,res,next)=> { 
if(req.session.userid.LoggedIn = false){
    res.redirect('index.html');
    console.log('you cant be here');
    return;
}
else{
    next();
}
});

app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});