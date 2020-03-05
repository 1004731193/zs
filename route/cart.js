/*
 * @Author: BigFaceCat
 * @Date: 2019-12-03 01:41:43
 * @LastEditTime: 2019-12-03 02:04:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AK_Server\route\cart.js
 */


const express=require("express");
var router=express.Router();
var pool=require("../pool");


/**
 * @description: 查询用户购物车所有信息
 * @return: {code : 301 , msg : "未登录"}
 *          {code : 200 , msg : "购物车成功" , result}
 *          {code : 201 , msg : "购物车为空"}
 *          {code : 300 , msg : "查询失败"}
 */
router.get("/queryUserCartData",(req,res)=>{
    let uid = req.session.uid;
    if(!uid){
        res.send({code : 301 , msg : "未登录"});
        return;
    }

    let sql = "select * from cart where uid=?";
    pool.query(sql,[uid],(err,result)=>{
        if(err) throw err;
        if(Array.isArray(result)){
            if(result.length > 0){
                res.send({code : 200 , msg : "购物车成功" , result});
            }else if(result.length == 0){
                res.send({code : 201 , msg : "购物车为空"});
            }else{
                res.send({code : 300 , msg : "查询失败"});
            }
        }
    });
});


/**
 * @description: 添加购物车信息
 * @param {Number} 商品id
 * @param {Number} 商品数量
 * @param {Number} 购买时单价
 * @return: {code : 301 , msg : "未登录"}
 *          {code : 302 , msg : "商品id(pid)获取失败"}
 *          {code : 303 , msg : "购买数量(count)获取失败"}
 *          {code : 304 , msg : "购买时单价(unit_price)获取失败"}
 *          {code : 200 , msg : '加入购物车成功'}
 *          {code : 300 , msg : '加入购物车失败,请稍后再试'}
 */
router.post("/addOnceUserCart",(req,res)=>{
    let uid = req.session.uid;
    let pid = req.body.pid;
    let count = req.body.count;
    let unit_price = req.body.unit_price;

    if(!uid){
        res.send({code : 301 , msg : "未登录"});
        return;
    }

    if(!pid){
        res.send({code : 302 , msg : "商品id(pid)获取失败"});
        return;
    }

    if(!count){
        res.send({code : 303 , msg : "购买数量(count)获取失败"});
        return;
    }

    if(!unit_price){
        res.send({code : 304 , msg : "购买时单价(unit_price)获取失败"});
        return;
    }

    let sql = "insert into cart values(null,?,?,?,?)";
    pool.query(sql,[pid,uid,count,unit_price],(err,result)=>{
        if(err) throw err;
        if(result instanceof Object){
            if(result.affectedRows > 0){
                res.send({code : 200 , msg : '加入购物车成功'});
            }else{
                res.send({code : 300 , msg : '加入购物车失败,请稍后再试'});
            }
        }
    });

});

/**
 * @description: 删除指定购物车信息
 * @param {Number}  购物车信息id
 * @return: {code : 301 , msg : "未登录"}
 *          {code : 302 , msg : "购物车信息id(cid)获取失败"}
 */
router.post("/deleteOnceUserCart",(req,res)=>{
    let uid = req.session.uid;
    let cid = req.body.cid;
    if(!uid){
        res.send({code : 301 , msg : "未登录"});
        return;
    }

    if(!cid){
        res.send({code : 302 , msg : "购物车信息id(cid)获取失败"});
        return;
    }

    let sql = "delete from cart where cid=?";
    pool.query(sql,[cid],(err,result)=>{
        if(err) throw err;
        if(result instanceof Object){
            if(result.affectedRows > 0){
                res.send({code : 200 , msg : "删除成功"});
            }else{
                res.send({code : 300 , msg : "删除失败,请稍等重试"});
            }
        }
    });
});


module.exports = router;
