/*
 * @Author: BigFaceCat
 * @Date: 2019-12-02 23:01:00
 * @LastEditTime: 2019-12-03 01:41:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AK_Server\route\product.js
 */


const express=require("express");
var router=express.Router();
var pool=require("../pool");

/**
 * @description: 获取推荐商品信息
 * @return: {code : 200 , msg : "查询成功" , result : arr}
 *          {code : 300 , msg : "查询失败" , error : err}
 */
router.get("/queryProductRecommend",(req,res)=>{
    let sql = "select pid from product_recommend";
    let resultArr = [];
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        let promiseFuns = [];
        if(Array.isArray(result)){
            result.forEach((ele)=>{
                promiseFuns.push(new Promise((resolve,reject)=>{
                    pool.query(`select pid,pic_1,title,price from products`,(err,result)=>{
                        if(err) reject(err);
                        resolve(result[0]);
                    });
                }));
            });
            Promise.all(promiseFuns).then(arr=>{
                res.send({code : 200 , msg : "查询成功" , result : arr});
            }).catch(err=>{
                res.send({code : 300 , msg : "查询失败" , error : err});
            });
        }
    });
});

/**
 * @description: 查询某类商品简介信息
 * @param {String} 商品类别名
 * @return: {code : 301 , msg : '参数获取失败'}
 *          {code : 300 , msg : '查询时出错'}
 *          {code : 200 , msg : '查询成功' , result : *}
 */
router.get("/queryProductForType",(req,res)=>{
    let type = req.query.type;
    if(!type){
        res.send({code : 301 , msg : '参数获取失败'});
        return;
    }

    let sql = "select type from product_family where type_name=?";
    pool.query(sql,[type],(err,result)=>{
        console.log(err);
        if(err) throw err;
        if(Array.isArray(result)){
            if(result.length > 0){
                let sql2 = "select pid,pic_1,title,price from products where product_family=?";
                pool.query(sql2,[result[0].type],(err,result)=>{
                    if(err) throw err;
                    res.send({code : 200 , msg : '查询成功' , result});
                });
            }
        }else{
            res.send({code : 300 , msg : '查询时出错'});
        }
    });
});


/**
 * @description: 查询指定商品详情
 * @param {Number} 商品id
 * @return: {code : "301" , msg : '参数获取失败'}
 *          {code : 200 , msg : "查询成功" , result}
 *          {code : 300 , msg : "没有此商品详情信息" , result : null}
 */
router.get("/queryProductDetail",(req,res)=>{
    let pid = req.query.pid;
    if(!pid){
        res.send({code : "301" , msg : '参数获取失败'});
        return;
    }

    let sql = "select * from products where pid=?";
    pool.query(sql,[pid],(err,result)=>{
        if(err) throw err;
        if(Array.isArray(result)){
            if(result.length > 0){
                res.send({code : 200 , msg : "查询成功" , result});
            }else{
                res.send({code : 300 , msg : "没有此商品详情信息" , result : null});
            }
        }
    });

});
module.exports = router;