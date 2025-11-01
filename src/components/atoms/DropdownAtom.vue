<template>
  <div @click="toggleDropdown" @blur="closeDropdown" tabindex="0">

    <label v-if="label" class="dropdown-label">
      {{ label }}
    </label>

    <div class="dropdown-container">


      <div class="dropdown-selected">
        {{ model }}
        <span class="dropdown-arrow" :class="{ open: isOpen }">▼</span>
      </div>
      <ul v-if="isOpen" class="dropdown-list">
        <li v-for="(item, index) in items" :key="index" @click.stop="selectItem(item)" class="dropdown-item">
          {{ item }}
        </li>
      </ul>
    </div>

  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  items: string[]
  label?: string
}>()

const model = defineModel<string>({})
const isOpen = ref(false)

if (!model.value && props.items.length > 0) {
  model.value = props.items[0]
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function closeDropdown() {
  isOpen.value = false
}

function selectItem(item: string) {

  console.log(item)

  model.value = item
  isOpen.value = false
}
</script>

<style scoped>
.dropdown-label {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.875rem;
  color: #6B7280;
  font-weight: 500;
}


.dropdown-container {
  position: relative;
  cursor: pointer;
  border: 2px solid #2563eb;
  border-radius: 6px;
  background-color: #ffffff;
  transition: border-color 0.2s ease;
  min-width: 150px;
}

.dropdown-container:focus {
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
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