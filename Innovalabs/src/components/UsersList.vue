<template>
  <div id="app">
    <p style="font-size: 20px">
      Question 2: Need to list total users from an API in a paginated list. The list can be searched
      and filtered and use vuex
    </p>
    <h1>User List</h1>
    <input
      type="text"
      v-model="localSearchQuery"
      @input="onSearch"
      placeholder="Search users..."
      style="margin: 4px"
    />
    <input
      type="text"
      v-model="filters.name"
      @input="onFilter('name')"
      placeholder="Filter by name..."
      style="margin: 4px"
    />
    <input
      type="text"
      v-model="filters.username"
      @input="onFilter('username')"
      placeholder="Filter by username..."
      style="margin: 4px"
    />
    <input
      type="text"
      v-model="filters.email"
      @input="onFilter('email')"
      placeholder="Filter by email..."
      style="margin: 4px"
    />
    <ul class="user-list">
      <li v-for="user in paginatedUsers" :key="user.id" class="user-item">
        <p class="user-name">{{ user.name }}</p>
        <p class="user-username"><strong>Username:</strong> {{ user.username }}</p>
        <p class="user-email"><strong>Email:</strong> {{ user.email }}</p>
      </li>
    </ul>
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
    <p>Page {{ currentPage }} of {{ totalPages }}</p>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      localSearchQuery: ''
    }
  },
  computed: {
    ...mapState(['filters', 'currentPage']),
    ...mapGetters(['paginatedUsers', 'totalPages'])
  },
  methods: {
    ...mapActions(['fetchUsers', 'setSearchQuery', 'setPage', 'setFilter']),
    onSearch() {
      this.setSearchQuery(this.localSearchQuery)
    },
    onFilter(key) {
      this.setFilter({ key, value: this.filters[key] })
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.setPage(this.currentPage - 1)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.setPage(this.currentPage + 1)
      }
    }
  },
  created() {
    this.fetchUsers()
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin-top: 60px;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  width: 250px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-list {
  list-style-type: none;
  padding: 0;
  max-width: 600px;
  margin: 0 auto;
}

.user-item {
  padding: 15px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.user-item:hover {
  background-color: #f9f9f9;
}

.user-name {
  font-weight: bold;
  margin: 0;
}

.user-username,
.user-email {
  margin: 0;
  color: #666;
}

.pagination {
  margin: 20px 0;
}

button {
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #0056b3;
}
</style>
