<template>
  <div class="dynamic-form">
    <form @submit.prevent="handleSubmit" class="form-container">
      <div v-for="block in blocks" :key="block.token" class="form-group">
        <div v-if="block.type === 'text'" class="form-field">
          <label :for="block.token">{{ block.props.title }}</label>
          <input
            :id="block.token"
            :name="block.token"
            v-model="formData[block.token]"
            :placeholder="block.props.placeholder"
            :required="block.props.required"
            type="text"
            class="form-input"
          />
        </div>
        <div v-if="block.type === 'checkbox'" class="form-field">
          <label :for="block.token">
            <input
              :id="block.token"
              :name="block.token"
              v-model="formData[block.token]"
              type="checkbox"
              class="form-checkbox"
            />
            {{ block.props.title }}
          </label>
        </div>
        <div v-if="block.type === 'date'" class="form-field">
          <label :for="block.token">{{ block.props.title }}</label>
          <input
            :id="block.token"
            :name="block.token"
            v-model="formData[block.token]"
            :placeholder="block.props.placeholder"
            :required="isFieldRequired(block.props.required)"
            type="date"
            class="form-input"
          />
        </div>
      </div>
      <button type="submit" class="form-submit-button">Submit</button>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  name: 'DynamicForm',
  props: {
    blocks: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const formData = reactive({})

    props.blocks.forEach((block) => {
      formData[block.token] = block.type === 'checkbox' ? block.props.default : ''
    })

    const isFieldRequired = (condition) => {
      if (typeof condition === 'boolean') {
        return condition
      }
      if (typeof condition === 'string') {
        return !!formData[condition]
      }
      return false
    }

    const handleSubmit = () => {
      for (const block of props.blocks) {
        if (block.props.required && !formData[block.token]) {
          alert(`The field "${block.props.title}" is required.`)
          return
        }
        if (
          typeof block.props.required === 'string' &&
          formData[block.props.required] &&
          !formData[block.token]
        ) {
          alert(
            `The field "${block.props.title}" is required when "${block.props.required}" is true.`
          )
          return
        }
      }

      console.log('Form Submitted:', formData)
      alert(`Form Submitted.`)
    }

    return {
      formData,
      isFieldRequired,
      handleSubmit
    }
  }
}
</script>

<style scoped>
.dynamic-form {
  max-width: 600px;
  margin: 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

.form-field {
  display: flex;
  flex-direction: column;
}

.form-field label {
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input,
.form-checkbox {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.form-checkbox {
  width: auto;
  margin-right: 10px;
}

.form-submit-button {
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-submit-button:hover {
  background-color: #0056b3;
}
</style>
