import { auth, refresh } from '@/api/Passport/auth'
import { logout, getInfo } from '@/api/user'
import router, { resetRouter } from '@/router'
import { setToken, getToken } from '@/utils/auth'
import store2 from 'store2'

const state = {
  token: getToken(),
  refreshToken: store2.session.get('refresh_token'),
  name: store2.session.get('info') ? store2.session.get('info').account : '',
  avatar: store2.session.get('info') ? store2.session.get('info').avatar : '',
  introduction: '',
  roles: store2.session.get('roles')
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESHTOKEN: (state, refresh_token) => {
    state.refreshToken = refresh_token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  auth({ commit }, userInfo) {
    const { account, password } = userInfo
    return new Promise((resolve, reject) => {
      auth({ account: account.trim(), password: password }).then(response => {
        commit('SET_TOKEN', response.data.access_token)
        commit('SET_REFRESHTOKEN', response.data.refresh_token)
        commit('SET_ROLES', response.data.roles)
        commit('SET_NAME', response.data.user_info.account)
        commit('SET_AVATAR', response.data.user_info.avatar)

        setToken(response.data.access_token)
        store2.session.set('refresh_token', response.data.refresh_token)
        store2.session.set('roles', response.data.roles)
        store2.session.set('menu', response.data.menu)
        store2.session.set('info', response.data.user_info)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout().then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        store2.session.clearAll()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // remove token
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      console.log(state.refreshToken)
      refresh(state.refreshToken).then(response => {
        commit('SET_TOKEN', response.data.access_token)
        commit('SET_REFRESHTOKEN', response.data.refresh_token)
        setToken(response.data.access_token)
        store2.session.set('refresh_token', response.data.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
