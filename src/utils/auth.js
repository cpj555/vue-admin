import store2 from 'store2'

const TokenKey = 'Access-Token'
const RefreshTokenKey = 'refresh_token'

export function getToken() {
  return store2.session.get(TokenKey)
}

export function setToken(token) {
  return store2.session.set(TokenKey, token)
}

export function removeToken() {
  store2.session.remove(RefreshTokenKey)
  return store2.session.remove(TokenKey)
}
