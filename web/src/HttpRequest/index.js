/**
 * Created by shenqiao on 2017/12/23.
 */
const axios = require('axios');

const BaseHandler = {
    baseURL:'http://localhost:9527',
    urlWithApi:(api)=>{
        return this.baseURL+api;
    }, //默认URL
    customUrlAndApi:(url,api)=>{
        return url+api;
    },
    postHttpRequest:(url,params,success,fail)=>{
        axios.post(url,{
            params:params
        }).then((response)=>{
                success(response);
                console.log(response);
            })
            .catch((error)=> {
                fail(error)
                console.log(error);
            });
    },
    getHttpReauest:(url,params,success,fail)=>{
        axios.get(url,{
                params:params
        }).then((response)=>{
                success(response);
                console.log(response);
            })
            .catch((error)=> {
                fail(error)
                console.log(error);
            });
    },
}



module.exports = BaseHandler;