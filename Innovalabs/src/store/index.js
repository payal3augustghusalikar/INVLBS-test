// src/store/index.js
import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    users: [],
    searchQuery: '',
    filters: {
      name: '',
      username: '',
      email: ''
      // Add more filters as needed
    },
    currentPage: 1,
    itemsPerPage: 5,
    totalUsers: 0
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users
    },
    SET_TOTAL_USERS(state, total) {
      state.totalUsers = total
    },
    SET_SEARCH_QUERY(state, query) {
      state.searchQuery = query
    },
    SET_FILTER(state, { key, value }) {
      state.filters[key] = value
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        commit('SET_USERS', response.data)
        commit('SET_TOTAL_USERS', response.data.length)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    setPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page)
    },
    setSearchQuery({ commit }, query) {
      commit('SET_SEARCH_QUERY', query)
      commit('SET_CURRENT_PAGE', 1) // Reset to first page on search
    },
    setFilter({ commit }, { key, value }) {
      commit('SET_FILTER', { key, value })
      commit('SET_CURRENT_PAGE', 1) // Reset to first page on filter change
    }
  },
  getters: {
    filteredUsers(state) {
      let filtered = state.users.filter((user) => {
        for (const key in user) {
          if (Object.prototype.hasOwnProperty.call(user, key)) {
            const value = user[key].toString().toLowerCase()
            if (value.includes(state.searchQuery.toLowerCase().trim())) {
              return true
            }
          }
        }
        return false
      })

      return filtered.filter((user) => {
        return Object.entries(state.filters).every(([key, value]) => {
          if (value === '') return true
          return user[key].toString().toLowerCase().includes(value.toLowerCase())
        })
      })
    },
    paginatedUsers(state, getters) {
      const start = (state.currentPage - 1) * state.itemsPerPage
      const end = start + state.itemsPerPage
      return getters.filteredUsers.slice(start, end)
    },
    totalPages(state, getters) {
      return Math.ceil(getters.filteredUsers.length / state.itemsPerPage)
    }
  }
})
