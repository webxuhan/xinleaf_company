const url = require('url');
const settings = require('./settings');
const mongoose = require('mongoose');
const async = require('async');
const moment = require('moment');
//数据库操作对象
const DbOpt = require('../Dbopt');
//管理员对象
const AdminUser = require('../AdminUser');


const adminFunc = {
/**
 * 通用分页
 * page:页数，pageSize:每页的数据条数大小，Model:当前操作的数据库对象,
**/
    pageQuery :function (page, pageSize, Model, populate, queryParams, sortParams, callback) {
        var start = (page - 1) * pageSize;
        var $page = {
            pageNumber: page
        };
        async.parallel({
            count: function (done) {  // 查询数量
                Model.count(queryParams).exec(function (err, count) {
                    done(err, count);
                });
            },
            records: function (done) {   // 查询一页的记录
                Model.find(queryParams).skip(start).limit(pageSize).populate(populate).sort(sortParams).lean(true).exec(function (err, doc) {
                    done(err, doc);
                });
            }
        }, function (err, results) {
            var count = results.count;
            $page.count = count;  //数据总条数
            // $page.pageCount = (count - 1) / pageSize + 1;
            $page.pageCount = Math.ceil(count/pageSize); //数据总页数
            $page.results = results.records;  //当前页的数据记录
            $page.results.forEach(function(item,index){
                item.register_time = moment(item.register_time).format('YYYY-MM-DD HH:mm:ss').toString();
                 // item.register_time = moment(item.register_time,moment.ISO_8601).format('YYYY MM DD HH').toString();
                // console.log('item.register_time:',item.register_time);
            })
            callback(err, $page);
        });
    }
};
    
module.exports = adminFunc;


