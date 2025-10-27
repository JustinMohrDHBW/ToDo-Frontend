<template>
    <div class="dropdown-wrapper" @click="toggleDropdown" @blur="closeDropdown" tabindex="0">
      <div class="dropdown-selected">
        {{ selectedLabel }}
        <span class="dropdown-arrow" :class="{ open: isOpen }">▼</span>
      </div>
      <ul v-if="isOpen" class="dropdown-list">
        <li 
          v-for="(item, index) in items" 
          :key="index" 
          @click.stop="selectItem(item)"
          class="dropdown-item"
        >
          {{ item }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  
  const props = defineProps<{
    items: string[]
    modelValue?: string
  }>()
  
  const isOpen = ref(false)
  const selected = ref(props.modelValue ?? '')
  
  const selectedLabel = computed(() => selected.value || 'Bitte auswählen')
  
  function toggleDropdown() {
    isOpen.value = !isOpen.value
  }
  
  function closeDropdown() {
    isOpen.value = false
  }
  
  function selectItem(item: string) {
    selected.value = item
    isOpen.value = false
  }
  </script>
  
  <style scoped>
  .dropdown-wrapper {
    position: relative;
    cursor: pointer;
    user-select: none;
    border: 2px solid #2563eb;
    border-radius: 6px;
    background-color: #ffffff;
    transition: border-color 0.2s ease;
  }
  
  .dropdown-wrapper:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
  }
  
  .dropdown-selected {
    padding: 10px;
    font-size: 14px;
    color: #1f2937;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .dropdown-arrow {
    transition: transform 0.2s ease;
  }
  
  .dropdown-arrow.open {
    transform: rotate(180deg);
  }
  
  .dropdown-list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ccc;
    border-radius: 6px;
    background-color: #ffffff;
    margin-top: 4px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    z-index: 1000;
    list-style: none;
    padding: 0;
  }
  
  .dropdown-item {
    padding: 8px 10px;
    font-size: 14px;
    color: #1f2937;
    transition: background-color 0.2s ease;
  }
  
  .dropdown-item:hover {
    background-color: #f3f4f6;
  }
  </style>
  