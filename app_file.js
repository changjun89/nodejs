const express = require('express');
const bodyPaser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyPaser.urlencoded({extended:false}));
app.set('view engine','jade');
app.set('views','./views');
app.locals.pretty = true;


app.get('/topic/new',(req,res)=>{
    fs.readdir('./data',(err,files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('form',{'topics':files});
    });
});

app.get(['/topic','/topic/:id'],(req,res) => {
    fs.readdir('./data',(err,files) => {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        const fileNm = req.params.id;
        if(fileNm) {
            //id  있을때
            fs.readFile('./data/'+fileNm,(err,data)=> {
                if(err) {
                    console.log(err);
                    res.status(500).send('Internal Server Error');
                }
                res.render('view',{'topics':files,'detail':data,'title':fileNm});
            })
        } else {
            //id 없을때
            res.render('view',{'topics':files,'detail':'hello javascript for server','title':'wlecome'});
        } 
    });
});

app.post('/topic',(req,res) => {
    const title = req.body.title;
    const description = req.body.description;

    fs.writeFile('./data/'+title,description, 'utf8', function(err) {
        if(err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.redirect('/topic/'+title);
    });
});


app.listen(3000,() => {
    console.log('conneted, 3000 port');
});