var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');

router.use(cookieParser());

var jwtSecret="my_strong_secret";
//jwt token decode and see what's inside
//jwt verify
router.get('/',function(req,res){

   var token = req.cookies.user;

   var decoded = jwt.verify(token, jwtSecret);
   if(decoded){
     console.log("decoded");
     res.json({
       jwt:decoded,
       isSuccess: true,
       code: 201,
       message:"가능한 권한"
   });
   console.log(decoded);

   }
   else{
     res.json({
       isSuccess: false,
       code: 401,
       message: "불가능한 권한"
     });
   }
})
module.exports = router;
