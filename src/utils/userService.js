import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(user)
  })
  .then(res => {
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Email already taken!');
  })
  .then(({token, profile}) => {
    tokenService.setToken(token)
    return profile
  });
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: JSON.stringify(creds)
  })
  .then(res => {
    console.log(res, ' <- respond object upon loging in')
    console.log(res.ok, ' <- res.ok')
    if (res.ok) return res.json();
    // Probably a duplicate email
    throw new Error('Bad Credentials!');
  })
  .then(({token, profile}) => {
    tokenService.setToken(token)
    return profile
  });
}

export default {
  signup,
  getUser,
  logout,
  login
};