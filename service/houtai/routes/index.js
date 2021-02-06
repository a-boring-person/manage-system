var express = require('express');
var router = express.Router();
var config = require('../database/dbconfig');
var mysql = require('mysql');

var conn = mysql.createConnection(config.mysql);

conn.connect();
console.log('数据库连接成功')
/* GET home page. */

router.post('/login',function(req,res,next) {
  let username = req.body.username;
  let password = req.body.password;
  console.log(username)
  console.log(password)
  let sql = 'select * from user where username='+mysql.escape(username)+'and password='+mysql.escape(password);
  conn.query(sql,function(err,rows,) {
    if (err) {
      console.log(err);
      return ;
    }
    let user = rows[0];
    console.log(user);
    if (user != undefined) {
      res.send({flag:true,message:'密码正确',user:user});
    }else{
      res.send({flag:false,message:'账号或密码错误'});
    }
    
  })

});

router.get('/userinfo',function(req,res,next) {
  let sql = 'select * from user';
  conn.query(sql,function(err,rows,) {
    if (err) {
      console.log(err);
      return ;
    }
    let userlist = rows;
    console.log(userlist);
    if (userlist != undefined) {
      res.send({userlist:userlist});
    }else{
      console.log('11123')
    }
    
  })

});
router.get('/userlist',function(req,res,next) {
  let sql = "select * from userinfo";
  conn.query(sql,function(err,rows) {
    if (err) {
      console.log(err);
      return ;
    }
    let userinfo = rows;
    console.log(userinfo);
    if (userinfo != undefined) {
      res.send({userinfo:userinfo});
    }else {
      console.log("发送失败");
    }
  })
});

router.post('/finduser',function(req,res,next) {
  let form = req.body.form;
  let username = form.realname;
  let email = form.email;
  let role = form.juese;
  console.log(role);
  let sql = "select * from userinfo where username="+mysql.escape(username)+"or email="+mysql.escape(email)+"or role="+mysql.escape(role);
  conn.query(sql,function(err,rows) {
    if (err) {
      console.log(err);
      return ;
    }
    console.log(rows);
    let finduser = rows;
    if (finduser != undefined) {
      console.log(111);
      res.send({user:finduser});
    }else{
      res.send({message:"未找到用户"});
    }
  })
});
router.post("/adduser",function(req,res,next) {
  let {username,tel,email,remark,status,role} = req.body.userform;
  console.log(username);
  let sql = "insert into userinfo (username,tel,email,remark,status,role) values ("+mysql.escape(username)+','+mysql.escape(tel)+','+mysql.escape(email)+','+mysql.escape(remark)+','+mysql.escape(status)+','+mysql.escape(role)+")"
  conn.query(sql,function(err) {
    if(err){
      console.log(err);
      return ;
    }else {
      res.send({message:'数据保存成功'})
    }
  })
});
router.post("/edituser",function(req,res,next) {
  let {username,tel,email,remark,status,role} = req.body.userform;
  let index = req.body.index;
  console.log(username);
  let sql = "update userinfo set "+" username="+mysql.escape(username)+',tel='+mysql.escape(tel)+',email='+mysql.escape(email)+',remark='+mysql.escape(remark)+',status='+mysql.escape(status)+',role='+mysql.escape(role)+"where uid="+index;
  conn.query(sql,function(err) {
    if(err){
      console.log(err);
      return ;
    }else {
      res.send({message:'数据保存成功'})
    }
  })
});
router.post("/deluser",function(req,res) {
  let uid = req.body.uid;
  console.log(uid);
  let sql = "delete from userinfo where uid="+mysql.escape(uid);
  conn.query(sql,function(err) {
    if (err) {
      console.log(err);
      return ;
    }

  })
});
router.post('/status',function(req,res) {
  let uid = req.body.uid;
  let status = req.body.status
  var sql;
  if (status == "启用") {
     sql = "update userinfo set status='禁止'";
     conn.query(sql,function(err) {
      if (err) {
        console.log(err);
        return ;
      }
    });
    res.send({status:"禁止"});
  }else {
     sql = "update userinfo set status='启用'";
     conn.query(sql,function(err) {
      if (err) {
        console.log(err);
        return ;
      }
    });
    res.send({status:"启用"});
  }
})



module.exports = router;
