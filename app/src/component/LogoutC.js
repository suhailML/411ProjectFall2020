import axios from 'axios';
var authstatus = false;
var userinfo = {};
var path = "";

const setPath = (uri) => path = uri;
const getPath = () => path;

const setAuthStatus = (b) => authstatus = b;
const getAuthStatus = () => authstatus;

const setUserInfo = (obj) => userinfo = obj;
const getUserInfo = () => userinfo;

const responseGoogle = (response) => {
  console.log(response);
}

export function checkToken(id, callback) {
   axios.post("http://localhost:4001/movieRouter/" + id)
            .then(res => {
                console.log(res)
                setAuthStatus(true);
                if (res.data.info.length == 0) {
                  setPath("signup");
                } else {
                  setPath('home')
                }
                setUserInfo(res);
            })           
            .catch(err => console.log(`Fail with err ${err}`))
  callback();
}
  
export default {
  checkToken,
  getAuthStatus,
  getUserInfo,
  getPath
}