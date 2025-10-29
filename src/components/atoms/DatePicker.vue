<template>
    <div class="date-picker-wrapper">
      <label v-if="label" :for="id" class="date-picker-label">
        {{ label }}
      </label>
  
      <input 
          :id="id"
          type="date"
          v-model="model" 
          class="date-input"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  
  interface Props {
    label?: string;
  }
  const props = defineProps<Props>();
  
  const model = defineModel<string>();
  
  const id = computed(() => `date-input-${Math.random().toString(36).substring(2, 9)}`);
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
  </style>