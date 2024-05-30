<template>
  <div style="border: 1px solid; border-color: grey; padding: 5px; margin: 10px">
    <p style="color: green">This is child component 1</p>
    <div>{{ message }}</div>
    <br />
    <button @click="sendMessageToParent">Send Message to Parent</button>
    <p>{{ messageFromChildComponent2 }}</p>
  </div>
</template>

<script>
import eventBus from '../utils/eventBus.js'

export default {
  props: ['message'],
  data() {
    return {
      messageFromChildComponent2: ''
    }
  },
  methods: {
    sendMessageToParent() {
      this.$emit('child-message', 'Hello from child!')
    }
  },
  created() {
    eventBus.$on('child-message', (message) => {
      this.messageFromChildComponent2 = message
    })
  }
}
</script>
