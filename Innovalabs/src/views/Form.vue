<template>
  <div id="app">
    <p style="font-size: 20px">Implementation for Question 3 is:</p>

    <DynamicForm :blocks="formBlocks" />
  </div>
</template>

<script>
import DynamicForm from '../components/DynamicForm.vue'

export default {
  name: 'App',
  components: {
    DynamicForm
  },
  data() {
    return {
      formBlocks: [
        {
          token: 'PERSON_NAME',
          type: 'text',
          props: {
            title: 'Enter your name',
            required: true,
            placeholder: 'e.g John Doe'
          }
        },
        {
          token: 'IS_PERSON_MINOR',
          type: 'checkbox',
          props: {
            title: 'Is the current person minor?',
            default: false
          }
        },
        {
          token: 'PERSON_DOB',
          type: 'date',
          props: {
            title: 'Enter your DOB',
            required: 'IS_PERSON_MINOR',
            placeholder: 'e.g 01/01/2000'
          }
        }
      ]
    }
  }
}
</script>
