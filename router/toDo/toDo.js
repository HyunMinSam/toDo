var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var mysql = require('mysql');
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
//toDoList에서 권한을 확인하고 user id 를 찾아서 text 를 등록, 삭제, 완료를 만들 것 이다.
//(완료)새로운 투두를 입력했을때 즉, 등록했을때에 toDoList에 등록한것까지 구현하였다. tobecontined;
//(완료)투두를 보여주는 것을 하였다. 추가적으로  젤 처음 인서트할때에는 에초에 is_done & is_deleted 가 당연히 0이다. 따라서 추가적으로 INSERT 해줄필요가없다.
//(완료)SQL 인젝션을 피하기위해 `  `백틱을이용하는게아니라 변수와 배열등을 이용해서 사용하도록한다.
//현재 등록, 보여주기까지 했고 삭제is_deleted, is_done 완료를 추가로 할 것이다.
//mysql 의 컬럼정보를 바꿔야함 디폴트로
//오류 수정 table toDo로 변경.

//완료 버튼 클릭. user_id =? , is_done = 1, (자동적으로 updated_change);
//삭제 버튼 클릭. is_deleted=1,

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'qkrgusals2',
  database : 'justToDo',
  port : 3306

});

connection.connect();

router.use(cookieParser());

var jwtSecret="my_strong_secret";

router.post('/show',function(req,res){

  var token = req.cookies.user;
  var decoded = jwt.verify(token, jwtSecret);
  if(!decoded)
  {
    res.json({
      isSuccess : false,
      code : 403

    })
  }
  else
  {
    var uid = decoded.user_id;
    var sql = `select * from toDo WHERE (is_deleted=0)&(user_id=?)`;
    var params = [uid];
    var query = connection.query(sql, params, function(err,rows){
      if(err){
        throw err;
      }
      else{
        res.json({
          result: rows,
          isSuccess : true,
          code : 202
        })
      }
    })

  }

})
//post method /toDo/upload
router.post('/upload',function(req,res){

     var token = req.cookies.user;
     var decoded = jwt.verify(token, jwtSecret);
     if(!decoded)
     {
       res.json({
         isSuccess : false,
         code : 404,
         msg: "token expired"
       })
     }
     else
     {
       //need  text, user_id;
       var text = req.body.text;
       // console.log(decoded);
       var user_id = decoded.user_id;
       var params = [user_id, text];
       var sql = `INSERT INTO toDo (user_id, text) VALUES(?, ?)`;
       // console.log(user_id);
       var query = connection.query(sql, params, function(err,rows){
         if(err)
         {
           throw err;
         }
         else
         {
           res.json({
             isSuccess : true,
             code : 204,
             msg: "inserted"
           })
         }
       })
     }
})
module.exports = router;
