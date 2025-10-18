<template>
    <div class="input-container">
      <input 
        class="minimal-input" 
        type="text" 
        :placeholder="placeHolder" 
        v-model="model"
      />
    </div>
</template>
  
<script setup lang="ts">
import { defineModel, ref } from 'vue';

const model = defineModel()

const props = defineProps({
    placeHolder: String
})

</script>
  
<style scoped>

.input-container {
  width: 100%;
}

.minimal-input {
width: 100%;
padding: 10px 12px;
box-sizing: border-box;

font-size: 1rem;
font-family: inherit;
color: #333;

background-color: #ffffff;
border: 1px solid #d1d5db;
border-radius: 6px;
outline: none;
}

.minimal-input::placeholder {
color: #9ca3af;
}

.minimal-input:focus {
border-color: #3b82f6;
box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
</style>