/*
 * @Author: BigFaceCat
 * @Date: 2019-12-02 22:18:55
 * @LastEditTime: 2019-12-02 22:59:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AK_Server\route\user.js
 */

const express=require("express");
var router=express.Router();
var pool=require("../pool");

/**
 * @description: 用户登录
 * @param {String} 用户名
 * @param {String} 登录密码
 * @return: {code : 200 , msg : "登录成功"}
 *          {code : 301 , msg : "账号获取错误"}
 *          {code : 302 , msg : "密码获取错误"}
*           {code : 300 , msg : '账号或密码错误'}
 */         
router.post("/login",(req,res)=>{
    let phone = req.body.phone;
    let upwd = req.body.upwd;

    if(!phone){
        res.send({code : 301 , msg : "账号获取错误"});
        return;
    }else if(!upwd){
        res.send({code : 302 , msg : "账号获取错误"});
        return;
    }

    let sql = "select uid from users where phone=? and upwd=?";
    pool.query(sql,[phone,upwd],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            req.session.uid = result[0].uid;
            res.send({code : 200 , msg : '登录成功'});
        }else{
            res.send({code : 300 , msg : '账号或密码错误'});
        }
    });
});

/**
 * @description: 用户注册
 * @param {String} 登录手机号
 * @param {String} 登录密码
 * @return: {code : 200 , msg : "注册成功"}
 *          {code : 301 , msg : "账号获取错误"}
 *          {code : 302 , msg : "密码获取错误"}
*           {code : 300 , msg : '注册失败'}
 */
router.post("/register",(req,res)=>{
    let phone = req.body.phone;
    let upwd = req.body.upwd;

    if(!phone){
        res.send({code : 301 , msg : "账号获取错误"});
        return;
    }else if(!upwd){
        res.send({code : 302 , msg : "密码获取错误"});
        return;
    }

    let sql = "insert into users (uid,phone,upwd) values(null,?,?)";
    pool.query(sql,[phone,upwd],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows > 0){
            res.send({code : 200 , msg : '注册成功'});
        }else{
            res.send({code : 300 , msg : '注册失败'});
        }
    });
});


/**
 * @description: 获取用户详细信息
 * @return: {code : 200 , msg : "查询成功" , result : *}
 *          {code : 301 , msg : "未登录"}
 */
router.get("/queryUserData",(req,res)=>{
    let uid = req.session.uid;
    if(!uid){
        res.send({code : 301 , msg : "未登录"});
        return;
    }

    let sql = "select * from users where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            res.send({code : 200 , msg : "查询成功" , result});
        }else{
            res.send({code : 301 , msg : "查询失败" , result : null});
        }
    });
});

module.exports = router;