const BASE_URL = 'http://localhost:8000';
const LIVE_URL = 'https://node-js-wse4.onrender.com';

const api = {
  REGISTER: `${LIVE_URL}/user`, 
  VERIFICATION: `${LIVE_URL}/user/email/verification`, 
  LOGIN: `${LIVE_URL}/user/login`,
  GET_ALL_USERS: `${LIVE_URL}/user`,
  GET_USER_BY_ID: `${LIVE_URL}/user`,       
  UPDATE_USER   : `${LIVE_URL}/user`,         
  DELETE_USER   : `${LIVE_URL}/user`, 
  FORGOT_PASSWORD: `${LIVE_URL}/user/forgot-password`, 
  RESET_PASSWORD: `${LIVE_URL}/user/reset-password`,



  
  
};

export default api;
export { BASE_URL, LIVE_URL, api };