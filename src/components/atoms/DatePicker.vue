<template>
  <div class="date-picker-wrapper">
    <label v-if="label" :for="id" class="date-picker-label">
      {{ label }}
    </label>

    <input :id="id" type="date" v-model="model" class="date-input" :class="{ 'input-error': isInvalid }" />

    <p v-if="isInvalid" class="error-message">
      {{ errorMessage }}
    </p>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label?: string;
  errorMessage?: string;
}>();
const model = defineModel<string>();

const id = computed(() => `date-input-${Math.random().toString(36).substring(2, 9)}`);
const isInvalid = computed(() => !!props.errorMessage);

</script>

<style scoped>
.date-picker-wrapper {
  width: 100%;
}

.date-picker-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}

.date-input {
  width: 100%;
  padding: 0.75rem 1rem;

  color: #111827;
  background-color: #F9FAFB;
  border: 1px solid #D1D5DB;
  border-radius: 10px;
  font-family: inherit;
  line-height: 1.5;
  box-sizing: border-box;

  color-scheme: light;
}

.date-input:focus {
  outline: none;
  border-color: transparent;
  box-shadow: 0 0 0 2px #6366F1;
}



.date-input.input-error {
  border-color: #ef4444;
}


.date-input.input-error:focus {
  border-color: #EF4444;
  box-shadow: 0 0 0 1px #F87171;
}

.error-message {
  color: #dc2626;
  font-size: 0.7rem;
  margin: 0;
  padding-top: 0.25rem;
}
</style>