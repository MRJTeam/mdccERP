/**
 * Created by shenqiao on 2017/12/20.
 */
const getAllCustomer = ()=>
{
    return `
			SELECT
       A.customer_id as id,
       A.customer_name as name,
       A.customer_telephone as phone,
       A.customer_deal_state as status,
       DATE_FORMAT(A.customer_create_time,'%Y-%m-%d') as date,
       A.customer_intention as intention,
       B.staff_name as staff,
       C.channel_name as channel
       FROM
			 table_customer A,
			 table_staff B ,
       table_channel C,
			 table_staff_customer_binding E,
			 table_channel_customer_binding F
        WHERE A.customer_avtive = 1
				AND
        A.customer_id = E.customer_id
				AND
        A.customer_id = F.customer_id
				AND
		B.staff_id = E.staff_id
				AND
		C.channel_id = F.channel_id
				GROUP BY id,channel,staff
				ORDER BY A.customer_create_time DESC
     `
}

const  updateCustomerStatus = ()=>{
    return "UPDATE table_customer A SET A.customer_deal_state = ? WHERE A.customer_id = ?";
}

const addCustomer = ()=>{
    return "INSERT INTO table_customer" +
        "(customer_id,customer_name,customer_telephone,customer_intention,customer_create_time,customer_deal_state,customer_avtive) " +
        "VALUES(?,?,?,?,NOW(),0,1)";
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