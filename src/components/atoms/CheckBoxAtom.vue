<template>
  <label class="checkbox-wrapper">
    <input type="checkbox" v-model="isChecked" />
    <span class="checkbox-label">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  id?: number;
  label?: string;
}>();

const model = defineModel<boolean>({ default: false })
const selectSet = defineModel<Set<number>>('selectSet')

const isChecked = computed({
  get() {
    if (selectSet.value && props.id !== undefined) {
      return selectSet.value?.has(props.id) ?? false
    } else {
      return model.value
    }
  },
  set(newValue) {

    if (selectSet.value && props.id !== undefined) {

      if (newValue === true) {
        selectSet.value.add(props.id)
      } else {
        selectSet.value.delete(props.id)
      }

    } else {
      model.value = newValue
    }

  }
})


</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 10px;
}

.checkbox-wrapper input[type="checkbox"] {
  width: 20px;
  height: 20px;
  appearance: none;
  border: 2px solid #2563eb;
  border-radius: 4px;
  background-color: #ffffff;
  position: relative;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.checkbox-wrapper input[type="checkbox"]:checked {
  background-color: #2563eb;
  border-color: #2563eb;
}

.checkbox-wrapper input[type="checkbox"]:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 7px;
  width: 4px;
  height: 10px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-wrapper input[type="checkbox"]:hover {
  border-color: #1e4ed8;
}

.checkbox-wrapper input[type="checkbox"]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.3);
}

.checkbox-label {
  font-size: 14px;
  color: #1f2937;
  /* dunkles Grau für Business-Optik */
  font-weight: 500;
  white-space: nowrap;
}
</style>