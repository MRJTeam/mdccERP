/**
 * Created by shenqiao on 2017/12/20.
 */
const getAllCustomer = function()
{
    return `SELECT A.customer_id as customerId,
       A.customer_name as customerName,
       A.customer_deal_state as customerDealState,
       DATE_FORMAT(A.customer_create_time,'%Y-%m-%d') as customerDate,
			 B.staff_name as staffName,
       C.channel_name as channelName,
			 D.segment_name as segmentName
       FROM
			 table_customer A,
			 table_staff B ,
       table_channel C,
       table_segment D,
			 table_staff_customer_binding E,
			 table_channel_customer_binding F,
       table_segment_customer_binding G
       WHERE A.customer_avtive = 1 AND
        A.customer_id = E.customer_id AND
        A.customer_id = F.customer_id AND
        A.customer_id = G.customer_id `
}


const  updateCustomerStatus = ()=>{
    return "UPDATE table_customer A SET A.customerDealState = ?";
}

const addCustomer = ()=>{
    return "INSERT INTO table_customer" +
        "(customer_id,customer_name,customer_telephone,customer_create_time,customer_deal_state,customer_avtive) " +
        "VALUES(?,?,?,NOW(),0,1)"
}

const bindCustomerAndChannel = ()=>{
    return "INSERT INTO table_channel_customer_binding " +
        "(`binding_id`, `channel_id`, `customer_id`) " +
        " VALUES(?,?,?)";
}
const bindCustomerAndStaff = ()=>{
    return "INSERT INTO table_staff_customer_binding (binding_id,staff_id,customer_id) " +
        "VALUES(?,?,?)";
}
const bindCustomerAndSegment = ()=>{
    return "INSERT INTO table_segment_customer_binding (binding_id,segment_id,customer_id) " +
        "VALUES(?,?,?)";
}

module.exports = {
    addCustomer,
    getAllCustomer,
    updateCustomerStatus,
    bindCustomerAndSegment,
    bindCustomerAndStaff,
    bindCustomerAndChannel
}