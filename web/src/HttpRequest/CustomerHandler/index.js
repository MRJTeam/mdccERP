/**
 * Created by shenqiao on 2017/12/24.
 */

import {BaseHandler,API_MAP} from '../index'

export const CustomerHandler =
{
    getAllCustomer:(success,failed)=>{
        BaseHandler.postHttpRequest(
            BaseHandler.customUrlAndApi(BaseHandler.baseURL,API_MAP.getAllCustomer),
            null,
            (successData)=>{
                let data = successData.data;
                success(data.map((item,i)=>{
                    //return {name:item.cutomerName,...item};
                }))
            },
            (failedData)=>{

            }
        )
    }
}