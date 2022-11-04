const { appendFile } = require("fs");
const express = require('express');
const session = require('express-session');
const app = express();
const port = 3000
const fs = require('fs');
const { json } = require("express");

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

let userInfo = [{firstname:"joe", lastname:"lem", username: "lem", password:"joe"}];
let allPosts = [{username: "lem", posttext:"I made a post!"}];


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
//registering users
app.post('/register', (req, res) => {
    let alreadyTaken = false;
    let jsonStringFromFile = fs.readFileSync('register.json', { encoding: 'utf8'});
    let dataFromFile = JSON.parse(jsonStringFromFile);
    userInfo = dataFromFile;
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
            //res.redirect('login.html') old way (put at bottom)
            let jsonString = JSON.stringify(userInfo, null, 2);
            console.log("jsonstring" + jsonString);
            fs.writeFileSync(("register.json"), jsonString);
            //return; old way
            res.redirect('login.html')
    }
    else{
        res.write("username taken try a new one.");
    }
    
    htmlStart(res, "something cool");
    res.write('brody');
    htmlEnd(res);
});
//making posts 
app.post('/LPBFW', (req, res)=> {
    //json
    let jsonStringFromFile = fs.readFileSync('posts.json', { encoding: 'utf8'});
    let dataFromFile = JSON.parse(jsonStringFromFile);
    allPosts = dataFromFile;
    //end json
    allPosts.push({username: req.session.userid, 
    posttext: req.body.posttext});
    //json stuff
    let jsonString = JSON.stringify(allPosts, null, 2);
        console.log("jsonstring" + jsonString);
        fs.writeFileSync(("posts.json"), jsonString);
    //end json stuff
    htmlStart(res, "yuh");
    for(let i of allPosts){
        res.write(`<ul> ${i.posttext} By: ${i.username}</ul>`)
    }
    htmlEnd(res);
});
//logout stuff 
app.post('/logout', (req, res) => {
    req.session.userid.LoggedIn = false;
    res.redirect('index.html');
    return;
});
app.post('/delete', (req, res) => {
    //select post
    if(req.session.userid === post.username){
        //probably do some splice stuff with clicking on the item 
    }

});
//security doesnt work ngl L
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