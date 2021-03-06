const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res)=>{
    let fName = req.body.fName;
    let lName = req.body.lName;
    let email = req.body.email;

    let data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName
            }
        }]
    }

    let jsonData = JSON.stringify(data);

    let options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/6f5878fbcf",
        method: "POST",
        headers: {
            "Authorization": "dhinesh 900b9e837e1fcd34a6b7f7608a876a57-us4",
        },
        body: jsonData
    }

    request(options, (error, response, body) => {
        if(error) {
            res.sendFile(__dirname + '/failure.html');
        } else if(response.statusCode === 200) {
            res.sendFile(__dirname + '/success.html');
        } else res.sendFile(__dirname + '/failure.html');  

    });
})

app.get('/:customList', (req, res) => {
    const customListName = req.params.cutomList;
    
    const list = new List({
        name: customListName,
        items: 
    });

});

app.post('/failure', (req,res) => {
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("Server is running in port: 3000");
});