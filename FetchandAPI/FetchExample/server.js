const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

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



app.listen(port, () => {
    console.log(`listening to u (on port ${port})`)
});
