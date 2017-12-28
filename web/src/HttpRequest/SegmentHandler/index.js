
/**
 * Created by shenqiao on 2017/12/26.
 */
import {BaseHandler,API_MAP} from '../index'

export const SegmentHandler =
{
    getAllSegment:(success,failed)=>{
        BaseHandler.postHttpRequest(
            BaseHandler.customUrlAndApi(BaseHandler.baseURL,API_MAP.getAllSegment),
            {},
            (successData)=>{
                let data = successData.data;
                success(data&&data.data?data.data:[])
            },
            (failedData)=>{
                success([])
            }
        )
    }

}