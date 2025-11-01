<template>
  <div class="input-container">
    <label v-if="label" class="input-label">
      {{ label }}
    </label>

    <input :class="{ 'input-error': isInvalid }" class="minimal-input" :type="type" :placeholder="placeHolder"
      v-model="model" />

    <p v-if="isInvalid" class="error-message">
      {{ errorMessage }}
    </p>

  </div>
</template>

<script setup lang="ts">
import { computed, withDefaults } from 'vue';



const model = defineModel();

const props = withDefaults(defineProps<{
  placeHolder?: string,
  label?: string
  errorMessage?: string
  type?: string
}>(), {
  type: 'text'
});

const isInvalid = computed(() => !!props.errorMessage);

</script>

<style scoped>
.input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.minimal-input:focus {
  border-color: transparent;
  box-shadow: 0 0 0 2px #6366F1;
}

.minimal-input.input-error:focus {
  border-color: #EF4444;
  box-shadow: 0 0 0 1px #F87171;
}

.input-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.minimal-input {
  width: 100%;

  padding: 0.75rem 1rem;
  box-sizing: border-box;

  font-size: 1rem;
  font-family: inherit;

  color: #111827;

  background-color: #F9FAFB;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  outline: none;
}

.minimal-input::placeholder {
  color: #9ca3af;
}


.minimal-input.input-error {
  border-color: #EF4444;
}

.error-message {
  color: #DC2626;
  font-size: 0.7rem;
  margin: 0;
  padding-top: 0.25rem;
}
</style>