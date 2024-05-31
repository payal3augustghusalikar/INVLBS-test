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
    },
    SET_ITEMS_PER_PAGE(state, itemsPerPage) {
      state.itemsPerPage = itemsPerPage
    }
  },
  actions: {
    async fetchUsers({ commit }, { page, limit }) {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
          params: {
            _page: page,
            _limit: limit
          }
        })
        const users = response.data
        const totalUsers = parseInt(response.headers['x-total-count'], 10) // Assuming the API returns total count in headers

        commit('SET_USERS', users)
        commit('SET_TOTAL_USERS', totalUsers)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      }
    },
    setPage({ commit, dispatch, state }, page) {
      commit('SET_CURRENT_PAGE', page)
      dispatch('fetchUsers', { page, limit: state.itemsPerPage })
    },
    setItemsPerPage({ commit, dispatch, state }, itemsPerPage) {
      commit('SET_ITEMS_PER_PAGE', itemsPerPage)
      dispatch('fetchUsers', { page: state.currentPage, limit: itemsPerPage })
    },
    setSearchQuery({ commit, dispatch, state }, query) {
      commit('SET_SEARCH_QUERY', query)
      commit('SET_CURRENT_PAGE', 1)
      dispatch('fetchUsers', { page: 1, limit: state.itemsPerPage })
    },
    setFilter({ commit, dispatch, state }, { key, value }) {
      commit('SET_FILTER', { key, value })
      commit('SET_CURRENT_PAGE', 1)
      dispatch('fetchUsers', { page: 1, limit: state.itemsPerPage })
    }
  },
  getters: {
    filteredUsers(state) {
      let filtered = state.users.filter((user) => {
        return Object.entries(state.filters).every(([key, value]) => {
          if (value === '') return true
          return user[key].toString().toLowerCase().includes(value.toLowerCase())
        })
      })

      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase().trim()
        filtered = filtered.filter((user) => {
          return Object.values(user).some((value) => value.toString().toLowerCase().includes(query))
        })
      }

      return filtered
    },
    totalPages(state) {
      return Math.ceil(state.totalUsers / state.itemsPerPage)
    }
  }
})
