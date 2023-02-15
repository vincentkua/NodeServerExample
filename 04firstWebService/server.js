var express = require('express');
var bodyParser=require('body-parser');
var app = express();
var port = 3000;
var hostname = "localhost";
var userJSONArray=[
    {"userid":1,"username":"John","age":20,"email":"john@yahoo.com","password":"abc123"},
    {"userid":2,"username":"Mary","age":21,"email":"mary@yahoo.com","password":"abc123"}
];
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);//attach body-parser middleware
app.use(bodyParser.json());//parse json data

//GET /user -> Get all the user data
app.get('/user',function(req,res){
    console.log("Inside GET /user");
    res.status(200);
    res.type("json");
    res.send(`{"Users":${JSON.stringify(userJSONArray)}}`);    
});

//POST /user -> Insert new user
app.post('/user',function(req,res){
    var userBody=req.body;
    var username=req.body.username;
    var age=req.body.age;
    var email=req.body.email;
    var password=req.body.password;
    var biggestIndex=userJSONArray[userJSONArray.length-1].userid;
    var newUserid=biggestIndex+1;
    var user={"userid":newUserid,"username":username,"age":age,"email":email,"password":password};
    userJSONArray.push(user);
    res.status(200);
    res.type("json");
    res.send(`{"Message":"New user with userid ${newUserid} inserted"}`);
});

//GET /user/:id
app.get("/user/:id",function(req,res){
    var userid=req.params.id;
    var found=false;
    for(var i=0;i<userJSONArray.length;i++){
        if(userJSONArray[i].userid==userid){
            found=true;
            res.status(200);
            res.type("json");
            //res.send(`{"User":${JSON.stringify(userJSONArray[i])}}`);
            res.send(userJSONArray[i]);
        }
    }

    if(found==false){
        res.status(404);
        res.type("json");
        res.send(`{"Message":"User not found"}`);
    }

});

//----------------------
app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/user`);
});
