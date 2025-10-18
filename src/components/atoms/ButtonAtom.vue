<template>
  <button 
    class="primary-button"
    :disabled="props.disabled"  >
    {{ label }}
  </button>
</template>

<script setup lang="ts">

const props = defineProps({
  label: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

</script>

<style scoped>
.primary-button {
  padding: 10px 20px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
}

.primary-button:hover {
  background-color: #1e4ed8;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.primary-button:active {
  transform: scale(0.96);
}

.primary-button:disabled {
  background-color: #9ca3af;
  opacity: 0.7;
}
</style>