var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

// 이제 저 토큰 그대로 클라가 서버한테 줬을때 유효성검사해서 클라한태 다시주기
// (유효한 토큰이면 토큰안에 어떤 정보있는지도 ex) user_id) 클라에서 쿠키에 저장함 post 로 주는게아니라 클라 쿠키에서 꺼내서() 확인해야함
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qkrgusals2',
  database : 'justToDo',
  port : 3306

});

connection.connect();



//user get method
router.get('/',function(req,res){
  console.log("sign up get url");
})
//user post method to compare login information
//user sign up part success full

//유저가 회원가입 한다면 ?
router.post('/',function(req,res){

  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var sql = `SELECT * FROM user WHERE (email=?)`;
  var params = [email];
   var query = connection.query(sql, params, function(err,rows){
     if(err)
     {
       throw err;
     }
     else if(rows[0]){
       res.json({
         isSuccess: false,
         code: 405,
         message:"이메일이 중복되었습니다.",
       });
     }
     else{
       //중복이 되지 않는다면 회원가입 email , password , name 순서로 입력
       var sql2 = `INSERT INTO user (email, password_encrypted, name) VALUES (?,?,?)`;
       var params2 = [email, password, name];
       query2 = connection.query(sql2, params2, function(err2,rows2){
         if(err2){
           throw err2;
         }
         else{
           res.json({
             isSuccess: true,
             code: 205,
             message:"회원가입 성공",
           });
         }
       })
     }
   });
})











module.exports = router;
