var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

//회원정보 DELET 구현시 토큰 삭제 어떻게 할 것인가 ?
//로그아웃시 토큰을 어떻게 취소 시키나 ?


var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qkrgusals2',
  database : 'justToDo',
  port : 3306

});

connection.connect();

//login process jwt token making
//유저가 로그인한다면?
router.get('/', function(req,res){
    console.log('get method /login');

});
//이것 암호화와 숨기는것이 필요한 줄 알았지만 클라에서 처리
var jwtSecret="my_strong_secret";
//유저가 로그인 정보를 보내고 맞으면 토큰발급과 함께 성공.
//유저가 로그인 정보를 보내고 틀리면 토큰미발급과 함께 비성공.
router.post('/',function(req,res){

   var email = req.body.email;
   var password = req.body.password;
   var name = req.body.name;
   var sql = `SELECT * FROM user WHERE (email=?)&(password_encrypted=?)`;
   var params = [email,password];

   var query = connection.query(sql, params, function(err,rows){
     if(err)
     {
       throw err;
     }
     else if(rows[0]){

       var token = jwt.sign({
         user_id:rows[0].id,
         email:rows[0].email,
         name:rows[0].name
       },
       jwtSecret,
       {
         expiresIn :1800 //3hours;
       })

       //비번이랑 다맞았음!  그렇다면?
       res.cookie("user",token);
       res.json({
         jwt:token,
         isSuccess: true,
         code: 200,
         message:"로그인 성공"
       });

     }
     else{
       res.json({
         isSuccess: true,
         code: 400,
         message:"로그인 실패",

       })
     }

   });
})


module.exports = router;
