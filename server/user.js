//验证管理人员登录
checkUserExist = () => {
  return `SELECT user_id as userId, user_name as userName, user_nickname as nickName,user_password as password FROM table_user WHERE user_name = ? AND user_password = ?`
}

module.exports = {
  checkUserExist
}