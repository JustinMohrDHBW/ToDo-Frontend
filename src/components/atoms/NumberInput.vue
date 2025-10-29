<template>
<div class="number-input-wrapper">
    <label v-if="label" class="number-input-label">
      {{ label }}
    </label>

    <input 
        type="number"
        v-model="numericInput"
        class="number-input"
        :placeholder="placeholder"
        :aria-label="label || placeholder || 'Numerische Eingabe'"
        min="0"
        @keydown="restrictToNumbers"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const model = defineModel<string>();

const props = defineProps<{
    label?: string; 
    placeholder?: string;
}>()


function restrictToNumbers(event: KeyboardEvent) {
  if (
    !/[0-9]/.test(event.key) &&
    !['Backspace', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'].includes(event.key)
  ) {
    if (!event.ctrlKey && !event.metaKey) {
      event.preventDefault();
    }
  }
}


const numericInput = computed({
  get: () => Number(model.value),
  set: (value: string) => {
    model.value = String(value);
  }
});


</script>

<style scoped>

.number-input-wrapper {
    width: 100%;
}

.number-input-label {
    display: block;
    margin-bottom: 0.25rem; 
    font-size: 0.875rem; 
    color: #6B7280; 
    font-weight: 500; 
}

.number-input {
    width: 100%;
    padding: 0.75rem 1rem;
    font-family: inherit;
    font-size: 1rem;
    box-sizing: border-box; 
    
    color: #111827; 
    background-color: #F9FAFB; 
    border: 1px solid #D1D5DB; 
    border-radius: 10px;
}

.number-input:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px #6366F1;
}

.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number-input[type=number] {
    -moz-appearance: textfield;
}
</style>