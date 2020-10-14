export default {
  setToken,
  getToken,
  getUserFromToken,
  removeToken
};


function setToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  let token = localStorage.getItem('token');
  if (token) {
    // Check if expired, remove if it is.
    const payload = JSON.parse(atob(token.split('.')[1]));
    if(payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  console.log(token, 'token in getToken function');
  return token;
}

function getUserFromToken() {
  const token = getToken();
  console.log(token, 'this is the token');
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

function removeToken() {
  localStorage.removeItem('token');
}