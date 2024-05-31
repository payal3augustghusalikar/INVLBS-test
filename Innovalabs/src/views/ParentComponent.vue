<template>
  <div>
    <p style="font-size: 20px">Implementation for Question 1 is:</p>
    <ol type="a">
      <li>Parent-child communication</li>
      <li>Child Parent Communication</li>
      <li>Child Child Communication</li>
    </ol>
    <div style="border: 1px solid; border-color: grey; padding: 5px; margin: 10px">
      <p style="color: green">This is Parent Component 1</p>

      <p>{{ messageFromChild }}</p>
    </div>
    <ChildComponent :message="parentMessage" @child-message="handleChildMessage" />

    <ChildComponent2 />
  </div>
</template>

<script>
import ChildComponent from '../components/ChildComponent.vue'
import ChildComponent2 from '../components/ChildComponent2.vue'
export default {
  name: 'ParentComponent',
  data() {
    return {
      parentMessage: 'Hello from parent!',
      messageFromChild: ''
    }
  },
  components: {
    ChildComponent,
    ChildComponent2
  },

  methods: {
    handleChildMessage(message) {
      this.messageFromChild = message // 'Hello from child!'
    }
  }
}
</script>
