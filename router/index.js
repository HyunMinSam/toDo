var express = require('express');
var router = express.Router();
var bodyparser = require('body-parser');
var path = require('path');
var user = require('./user/user');
var someapi = require('./someapi/someapi');
var login = require('./login/login');
var toDo = require('./toDo/toDo');

router.use('/someapi',someapi);
//토큰 판별함
router.use('/user', user);
//유저 회원가입
router.use('/login', login);
//유저 로그인
router.use('/toDo', toDo);

module.exports = router;
