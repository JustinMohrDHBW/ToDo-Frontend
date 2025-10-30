<template>
  <div class="input-container">
    <label v-if="label" class="input-label">
      {{ label }}
    </label>
    
    <input 
      class="minimal-input" 
      type="text" 
      :placeholder="placeHolder" 
      v-model="model"
    />
  </div>
</template>

<script setup lang="ts">


const model = defineModel();

const props = defineProps<{
  placeHolder?: string,
  label?: string
  enableValidation?: boolean
}>();

</script>

<style scoped>
.input-container {
width: 100%;
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

.minimal-input:focus {
border-color: transparent; 
box-shadow: 0 0 0 2px #6366F1; 
}

</style>