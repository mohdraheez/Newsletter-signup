const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const port = 3000;
const https = require('https');
const { options } = require('request');

const app = express();

app.use(express.static(path.join(__dirname,'assets')));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/signup.html');
})

app.post('/', (req,res)=>{
    const name1 = req.body.firstname;
    const name2 = req.body.secondname;
    const email = req.body.email;

    var data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields :{
                    FNAME : name1,
                    LNAME : name2
                }
            }
        ]

    }

    var jsonData = JSON.stringify(data);
    url = "https://us21.api.mailchimp.com/3.0/lists/9baf7d187a"

    const options ={
        method : "POST",
        auth : "raheez:6520ce1b6bf7c98efd26c7b8f737fc9f-us21"
    }

    if(name1 === '' || name2 === '' || email===''){
        res.sendFile(__dirname+'/failure.html');
    }

    const request = https.request(url,options, (response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }
    })

    request.write(jsonData);
    request.end();

})


app.post('/failure',(req,res)=>{
    res.redirect('/');
})

app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})

//
//apiKey = 6520ce1b6bf7c98efd26c7b8f737fc9f-us21;
//audience id =9baf7d187a