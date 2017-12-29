/**
 * Created by shenqiao on 2017/12/29.
 */


export const valiedString = (str,maxLength)=>{
    if(typeof str != 'string')
    {
        return false;
    }

    if(!str)
    {
        return false;
    }else {
        return str.length>0&&str.length<=maxLength;
    }

}