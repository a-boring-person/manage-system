const api = 'http://127.0.0.1:3000/api/';
module.exports = {
    login:api+'login',
    getUserInfo:api+'userinfo',
    getUserList:api+'userlist',
    finduser:api+'finduser',
    addUser:api+'adduser',
    editUser:api+'edituser',
    deleteUser:api+"deluser",
    changeStatus:api+"status"
}