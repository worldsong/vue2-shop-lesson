var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('./../models/goods');


//连接MongoDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/vue_shop');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});

/* 查询商品列表数据*/
router.get('/list', function(req, res, next) {
  let page = parseInt(req.param("page"));
  let pageSize = parseInt(req.param("pageSize"));
  let startPrice = parseFloat(req.param("startPrice"));
  let endPrice = parseFloat(req.param("endPrice"));
  let sort = req.param("sort");
  let skip = (page-1)*pageSize;
  let params = {};
  if(endPrice){
    params = {
      salePrice:{
        $gt: startPrice,
        $lte: endPrice
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err, doc) {
    if(err){
      res.json({
        status: '1',
        msg: err.message
      })
    }else {
      res.json({
        status:'0',
        msg:'',
        result:{
          count: doc.length,
          list: doc
        }
      })
    }
  })
});

//加入到购物车
router.post("/addCart", function (req,res,next) {
  var userId = '100000077',productId = req.body.productId;
  var User = require('../models/user');
  User.findOne({userId:userId}, function (err,userDoc) {
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      // console.log("userDoc:"+userDoc);
      if(userDoc){
        var goodsItem = '';
        userDoc.cartList.forEach(function (item) {
          if(item.productId == productId){
            //购物车商品已经存在，只做数量+1
            goodsItem = item;
            item.productNum ++;
          }
        });
        if(goodsItem){
          userDoc.save(function (err2,doc2) {
            if(err2){
              res.json({
                status:"1",
                msg:err2.message
              })
            }else{
              res.json({
                status:'0',
                msg:'',
                result:'suc'
              })
            }
          })
        }else{
          //新增购物车商品
          Goods.findOne({productId:productId}, function (err1,doc) {
            if(err1){
              res.json({
                status:"1",
                msg:err1.message
              })
            }else{
              if(doc){
                doc.productNum = 1;
                doc.checked = 1;
                userDoc.cartList.push(doc);
                userDoc.save(function (err2,doc2) {
                  if(err2){
                    res.json({
                      status:"1",
                      msg:err2.message
                    })
                  }else{
                    res.json({
                      status:'0',
                      msg:'',
                      result:'suc'
                    })
                  }
                })
              }
            }
          });
        }
      }
    }
  })
});

module.exports = router;
