/*
 * @Author: your name
 * @Date: 2019-12-02 22:14:32
 * @LastEditTime: 2019-12-03 01:45:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \AK_Server\index.js
 */
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const cors=require("cors");

var user = require("./route/user");
var product = require("./route/product");
var cart = require("./route/cart");

var app = express();


app.use(cors({
    origin:['http://localhost:8080',"http://127.0.0.1:5050","http://localhost:5050","http://127.0.0.1:8080"],
    credentials:true
  }))
  
app.use(session({
    secret:"128位安全字符串",
    resave:true,         //请求更新数据 
    saveUninitialized:true//保存初始数据
}));  


app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

app.listen(5050);


app.use("/user",user);
app.use("/product",product);
app.use("/cart",cart);
