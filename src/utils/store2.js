import store2 from 'store2'

const TokenKey = 'Access-Token'

export function getToken() {
  return store2.session.get(TokenKey)
}

export function setToken(token) {
  return store2.session.set(TokenKey, token)
}
