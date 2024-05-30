<template>
  <div style="border: 1px solid; border-color: grey; padding: 5px; margin: 10px">
    <p style="color: green">This is child component 2</p>
    <div>{{ message }}</div>
    <br />
    <button @click="sendMessage">Send Message to Child Component 1</button>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus.js'

export default {
  props: ['message'],
  methods: {
    sendMessage() {
      eventBus.$emit('child-message', 'Hello from child 2!')
    }
  }
}
</script>
