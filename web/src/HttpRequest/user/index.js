import {BaseHandler,API_MAP} from '../index'

export const UserHander={
  login:(param,success,failed)=>{
    BaseHandler.postHttpRequest(
      BaseHandler.customUrlAndApi(BaseHandler.baseURL,API_MAP.login),param,
      (successData)=>{
          if(successData&&successData.data)
          {
              success(successData.data)
          }

    },
    (failedData)=>{
        failed(failedData)
    }
    )
  }

}