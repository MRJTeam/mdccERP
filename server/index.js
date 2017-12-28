/**
 * Created by shenqiao on 2017/12/19.
 */
//const


const {_dev,_port}= require('./server.config.js')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.json());
const {
    getAllChannel,
    addChannel
    } = require('./channel')

const {
    addStaff,
    getAllStaff
    }  = require('./staff')
const {
    addCustomer,
    getAllCustomer,
    updateCustomerStatus,
    bindCustomerAndSegment,
    bindCustomerAndStaff,
    bindCustomerAndChannel
    } = require('./customer')
const db = require('./DBConfig')
const API_MAP = {
    //用户相关
    addCustomer: '/customer/addCustomer',//添加用户
    editCustomer: '/customer/editCustomer',//编辑用户
    updateCustomerStatus: '/customer/updateCustomerStatus',//更新用户状态
    deleteCustomer: '/customer/deleteCustomer',//删除用户
    getAllCustomer: '/customer/getAllCustomer',//获取所有用户

    //渠道相关
    addChannel: '/channel/addChannel',//添加渠道
    deleteChannel: '/channel/deleteChannel',//删除渠道
    editChannel: '/channel/editChannel',//修改渠道
    getAllChannel: '/channel/getAllChannel',//获取所有渠道

    //员工相关
    addStaff: '/staff/addStaff',//添加员工
    deleteStaff: '/staff/deleteStaff',//删除员工
    editStaff: '/staff/editStaff',//添加员工
    getAllStaff: '/staff/getAllStaff',//获取所有员工信息

    addTimeSegment: '/segment/addSegment',//添加时段
    getAllSegment: '/segment/getAllSegment',//获取时段
}
const STATUS_CODE = {
    SUCCESS: 0,//成功回调
    SERVER_ERROR: -1,//服务器错误

    CHANNEL_PARAM_ERROR: -1000,//渠道部分参数错误


    CUSTOMER_PARAM_ERROR: -2000,//客户部分参数错误

    STAFF_PARAM_ERROR: -3000,//员工部分参数错误

    SEGMENT_PARAM_ERROR: -4000,//分段部分参数错误


}

const HTTPMETHOD = {
    GET: 'GET',
    POST: 'POST',
}

const getCallBack = (req, res)=> {
    httCallBack(req, res);
}
const postCallBack =(req, res)=> {
    httCallBack(req, res);
}
const httCallBack = (req, res)=> {
    if (!_dev)//开发者模式下所有的get请求都接收
    {
        res.status(500).end()
        return;
    }
    switch (req.path) {
        case API_MAP.getAllCustomer:
            sqlExecute(getAllCustomer(), null, (result)=> {
                if (result) {
                    res.send(packageData(STATUS_CODE.SUCCESS, req.path, result))
                } else {
                    res.send(packageData(STATUS_CODE.SERVER_ERROR, req.path, null))
                }
            })
            break;
        case API_MAP.updateCustomerStatus:
        {
            let param2 = req.objs;
            const {customerId,status}  = param2
            if (!customerId || !status) {
                res.send(packageData(STATUS_CODE.CUSTOMER_PARAM_ERROR, req.path, null))
            } else {
                let sqlParam = [customerId, status]

                sqlExecute(updateCustomerStatus(), null, (result)=> {
                    if (result) {
                        res.send(packageData(STATUS_CODE.SUCCESS, req.path, result))
                    } else {
                        res.send(packageData(STATUS_CODE.SERVER_ERROR, req.path, null))
                    }
                })
            }
        }
            break;
        case API_MAP.addCustomer:
        {
            let resolve = (rest)=>{};
            let reject = (fail)=>{};
            let param = req.objs;
            const {customerName,customerTelephone,staffId,segmentId,channelId}  = param
            if (customerName && customerTelephone && staffId && segmentId && channelId) {
                let customerId = getUuid();
                const customerParam = [customerId, customerName, customerTelephone];
                const bindCustomerAndStaffParam = [getUuid(), staffId, customerId];
                const bindCustomerAndChannelParam = [getUuid(), channelId, customerId];
                const bindCustomerAndSegmentParam = [getUuid(), segmentId, customerId];
                let promiseCustomer = new Promise((resolve,reject)=>sqlExecute(addCustomer(),customerParam,resolve))
                let promiseBindCustomerAndStaff = new Promise((resolve,reject)=>sqlExecute(bindCustomerAndStaff(),bindCustomerAndStaffParam,resolve))
                let promiseBindCustomerAndChannel = new Promise((resolve,reject)=>sqlExecute(bindCustomerAndChannel(),bindCustomerAndChannelParam,resolve))
                let promiseBindCustomerAndSegment = new Promise((resolve,reject)=>sqlExecute(bindCustomerAndSegment(),bindCustomerAndSegmentParam,resolve))
                const p = Promise.all([promiseCustomer, promiseBindCustomerAndStaff, promiseBindCustomerAndChannel,promiseBindCustomerAndSegment]);
                let ok = true;
                p.then((results)=>{
                    results.forEach((x)=>{
                        ok = ok&&x;
                    })
                    res.send(packageData(ok?STATUS_CODE.SUCCESS:STATUS_CODE.CUSTOMER_PARAM_ERROR, req.path, null))
                },(xxxx)=>{
                })
            } else {
                res.send(packageData(STATUS_CODE.CUSTOMER_PARAM_ERROR, req.path, null))
            }
        }
            break;
        case API_MAP.getAllChannel:
            sqlExecute(getAllChannel(), null, (result)=> {
                if (result) {
                    res.send(packageData(STATUS_CODE.SUCCESS, req.path, result))
                } else {
                    res.send(packageData(STATUS_CODE.SERVER_ERROR, req.path, null))
                }
            })
            break;
        case API_MAP.addChannel:
        {
            let param = req.objs;
            const {name,descrpition}  = param
            console.log(param);
            let sqlParam = [getUuid(), name, descrpition]
            if (!name) {
                res.send(packageData(STATUS_CODE.CHANNEL_PARAM_ERROR, req.path, null))
            } else {
                sqlExecute(addChannel(), sqlParam, (result)=> {
                    res.send(packageData(result ? STATUS_CODE.SUCCESS : STATUS_CODE.SERVER_ERROR, req.path, null))
                })
            }
        }
            break;
        case API_MAP.addStaff:
        {
            let param = req.objs;
            const {name,telephone}  = param
            console.log(param);
            let sqlParam = [getUuid(), name, telephone]
            if (!name) {
                res.send(packageData(STATUS_CODE.STAFF_PARAM_ERROR, req.path, null))
            } else {
                sqlExecute(addStaff(), sqlParam, (result)=> {
                    if (result) {
                        res.send(packageData(STATUS_CODE.SUCCESS, req.path, null))
                    } else {
                        res.send(packageData(STATUS_CODE.SERVER_ERROR, req.path, null))
                    }
                })
            }
        }
            break;
        case API_MAP.getAllStaff:
            sqlExecute(getAllStaff(),null, (result)=> {
                if (result) {
                    res.send(packageData(STATUS_CODE.SUCCESS, req.path, result))
                } else {
                    res.send(packageData(STATUS_CODE.SERVER_ERROR, req.path, null))
                }
            })
            break;
        default:
            res.status(404).end();
    }
}
const packageData = (status, msg, data)=> {
    return {
        status: status,
        msg: msg,
        data: data,
    }
}


const sqlExecute = (sql, param, callBack)=> {
    db.con(connect=> {
        if (param) {
            connect.query(sql, param, (err, result)=> {
                err && console.log(err);
                callBack && callBack(err ? null : result)
            })
        } else {
            connect.query(sql, (err, result)=> {
                err && console.log(err);
                callBack && callBack(err ? null : result)
            })
        }

    })
}
//async function doSometing(sql, param){
//    var f1 = await sqlExecute(sql, param);
//    console.log(f1);
//    //var f2 = await sqlExecute(bindCustomerAndChannel(),bindCustomerAndChannelParam,(val1)=>{
//    //
//    //});
//    //var f3 = await sqlExecute(bindCustomerAndSegment(),bindCustomerAndSegmentParam,(val1)=>{
//    //
//    //});
//    //var f4 = await sqlExecute(bindCustomerAndStaff(),bindCustomerAndStaffParam,(val1)=>{
//    //
//    //});
//}
const getUuid = ()=> {
    return uuid(11, 16)
}
function uuid(len, radix) {
    var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    var uuid = [], i;
    radix = radix || chars.length;

    if (len) {
        // Compact form
        for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
    } else {
        // rfc4122, version 4 form
        var r;

        // rfc4122 requires these characters
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        // Fill in random data. At i==19 set the high bits of clock sequence as
        // per rfc4122, sec. 4.1.5
        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }

    return uuid.join('');
}
app.all('*',(req, res,next)=>{

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
})
app.post('*', function (req, res) {
    switch (req.method) {
        case HTTPMETHOD.GET:
            req.objs = req.query;
            getCallBack(req, res);
            break;
        case HTTPMETHOD.POST:
            req.objs = req.body;
            postCallBack(req, res);
            break;
        default:
            res.status(400).end();
    }
})
app.get('*', function (req, res) {
    switch (req.method) {
        case HTTPMETHOD.GET:
            req.objs = req.query;
            getCallBack(req, res);
            break;
        case HTTPMETHOD.POST:
            req.objs = req.body;
            postCallBack(req, res);
            break;
        default:
            res.status(400).end();
    }
})


app.listen(_port ? _port : 9527, function (x) {
    console.log('Example app listening on port 9527!')
})

