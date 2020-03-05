-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-12-02 19:04:48
-- 服务器版本： 10.1.28-MariaDB
-- PHP Version: 5.6.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xg`
--

-- --------------------------------------------------------

--
-- 表的结构 `cart`
--

CREATE TABLE `cart` (
  `cid` int(11) NOT NULL COMMENT '购物车id',
  `pid` int(11) NOT NULL COMMENT '商品id',
  `uid` int(11) NOT NULL COMMENT '用户id',
  `count` int(11) NOT NULL COMMENT '购买数量',
  `unit_price` int(11) NOT NULL COMMENT '单价'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `cart`
--

INSERT INTO `cart` (`cid`, `pid`, `uid`, `count`, `unit_price`) VALUES
(1, 1, 1, 1, 100),
(2, 1, 1, 1, 100);

-- --------------------------------------------------------

--
-- 表的结构 `products`
--

CREATE TABLE `products` (
  `pid` int(11) NOT NULL COMMENT '商品id',
  `pic_1` varchar(128) DEFAULT NULL COMMENT '商品图片1',
  `pic_2` varchar(128) DEFAULT NULL COMMENT '商品图片2',
  `pic_3` varchar(128) DEFAULT NULL COMMENT '商品图片3',
  `pic_4` varchar(128) DEFAULT NULL COMMENT '商品图片4',
  `title` varchar(32) NOT NULL COMMENT '商品名称',
  `subtitle` varchar(64) DEFAULT NULL COMMENT '商品副标题',
  `price` decimal(7,2) NOT NULL COMMENT '商品价格',
  `stock` int(11) NOT NULL DEFAULT '999' COMMENT '库存',
  `sales_volume` int(11) NOT NULL COMMENT '销量',
  `details_pic` varchar(2048) NOT NULL COMMENT '详情图片(逗号分隔url)',
  `product_family` int(11) NOT NULL COMMENT '商品类别'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `products`
--

INSERT INTO `products` (`pid`, `pic_1`, `pic_2`, `pic_3`, `pic_4`, `title`, `subtitle`, `price`, `stock`, `sales_volume`, `details_pic`, `product_family`) VALUES
(1, '123', NULL, NULL, NULL, '123', NULL, '123.00', 999, 0, '', 1),
(2, '123', NULL, NULL, NULL, '123', NULL, '123.00', 999, 0, '', 2),
(3, '123', NULL, NULL, NULL, '123', NULL, '123.00', 999, 0, '', 3),
(4, '123', NULL, NULL, NULL, '123', NULL, '123.00', 999, 0, '', 4),
(5, '123', NULL, NULL, NULL, '123', NULL, '123.00', 999, 0, '', 5);

-- --------------------------------------------------------

--
-- 表的结构 `product_family`
--

CREATE TABLE `product_family` (
  `fid` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `type_name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product_family`
--

INSERT INTO `product_family` (`fid`, `type`, `type_name`) VALUES
(1, 1, '推杆'),
(2, 2, '卧吸'),
(3, 3, '除螨仪'),
(4, 4, '桶吸'),
(5, 5, '扫地机');

-- --------------------------------------------------------

--
-- 表的结构 `product_recommend`
--

CREATE TABLE `product_recommend` (
  `rec_id` int(11) NOT NULL COMMENT '推荐商品id',
  `pid` int(11) NOT NULL COMMENT '商品id'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product_recommend`
--

INSERT INTO `product_recommend` (`rec_id`, `pid`) VALUES
(5, 1),
(6, 2),
(7, 3),
(8, 4),
(9, 5);

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `uid` int(11) NOT NULL COMMENT '用户id',
  `phone` varchar(11) NOT NULL COMMENT '手机号',
  `upwd` varchar(32) NOT NULL COMMENT '密码',
  `pic` varchar(128) DEFAULT NULL COMMENT '头像',
  `email` varchar(64) DEFAULT NULL COMMENT '邮箱',
  `score` int(11) DEFAULT '0' COMMENT '积分',
  `discount` int(11) DEFAULT '0' COMMENT '优惠卷',
  `message` int(11) DEFAULT '0' COMMENT '通知数量',
  `beforePay` int(11) DEFAULT '0' COMMENT '待付款',
  `beforeDelivery` int(11) DEFAULT '0' COMMENT '待发货',
  `beforeReceive` int(11) DEFAULT '0' COMMENT '待收货'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`pid`);

--
-- Indexes for table `product_family`
--
ALTER TABLE `product_family`
  ADD PRIMARY KEY (`fid`);

--
-- Indexes for table `product_recommend`
--
ALTER TABLE `product_recommend`
  ADD PRIMARY KEY (`rec_id`),
  ADD UNIQUE KEY `pid` (`pid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `cart`
--
ALTER TABLE `cart`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车id', AUTO_INCREMENT=3;

--
-- 使用表AUTO_INCREMENT `products`
--
ALTER TABLE `products`
  MODIFY `pid` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `product_family`
--
ALTER TABLE `product_family`
  MODIFY `fid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用表AUTO_INCREMENT `product_recommend`
--
ALTER TABLE `product_recommend`
  MODIFY `rec_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '推荐商品id', AUTO_INCREMENT=10;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id', AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
