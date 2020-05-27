const express=require('express')
const jwt=require('jsonwebtoken')

const app=express()

//starting api
app.get('/getdata', (req,res)=>{
    console.log("aijaj")
    res.send("welcome to jwt authonitcation")
})

//generate token 
app.post('/login', (req,res)=>{
    var user={
        id:"101",
        username: "aijajkhan",
        email: "aijaj18@navgurukul.org"
    }
    // console.log(user)
    jwt.sign({user}, 'secret_key', {expiresIn: '30sec'} ,(err, token)=>{
        if(!err){
            console.log(token)
            return res.send(  token)
        }else{
            console.log("error while getting token", err)
        }
    })
})


//verify token and access and verified expired times.
app.post('/add_data', verified_token, (req,res)=>{
    jwt.verify(req.token, 'secret_key', (err, authData)=>{
        if(err){
            res.sendStatus(403)
        }else{
            return res.send({
                message: "post created..",
                authData
            })
        }
    })
})

// the format of token and verified
function verified_token(req,res, next){
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){

        //remove space
        const bearer=bearerHeader.split(' ');
        // console.log(bearer)
        const bearerToken=bearer[1];
        console.log(bearerToken)
        req.token=bearerToken;
        // return res.send(bearerToken)
        // next middleware 
        next()
    }else{  
        console.log("undefine values")
        res.sendStatus(403);
    }  
} 

//server
const port=5000
app.listen(port,()=>{
    console.log("server is listening...", port)
})