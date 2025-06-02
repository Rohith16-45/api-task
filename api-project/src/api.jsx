const BASE_URL = 'http://localhost:8000';
const LIVE_URL = 'https://node-js-wse4.onrender.com';

const api = {
  REGISTER: `${LIVE_URL}/user`, 
  VERIFICATION: `${LIVE_URL}/user/email/verification`, 
  LOGIN: `${LIVE_URL}/user/login`,
  GET_ALL_USERS: `${LIVE_URL}/user`,
  CATEGORY: `${LIVE_URL}/category`,
  PRODUCT: `${LIVE_URL}/product`,
  ORDER: `${LIVE_URL}/order`,
  COMMON_COUNTRIES: `${LIVE_URL}/common/countries`,

  
  
};

export default api;
export { BASE_URL, LIVE_URL, api };






    

