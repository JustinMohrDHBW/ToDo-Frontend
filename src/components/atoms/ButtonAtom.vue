<template>
  <button :class="buttonClass" :disabled="props.disabled">
    <i v-if="icon" :class="`pi pi-${icon}`"></i>
    <div v-else>{{ label }}</div>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String as () => 'primary' | 'secondary' | 'danger' | 'outline-danger',
    default: 'primary'
  },
  icon: {
    type: String,
    deafault: false
  }
});

const buttonClass = computed(() => [
  'btn',
  `btn-${props.variant || 'primary'}`
]);
</script>

<style scoped>
.btn {
  padding: 10px 10px;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  min-width: 0px;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.2s ease, transform 0.1s ease, box-shadow 0.2s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn:active {
  transform: scale(0.96);
}

.btn:disabled {
  background-color: #9ca3af;
  color: #e5e7eb;
  opacity: 0.7;
  cursor: not-allowed;
  box-shadow: none;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1e4ed8;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.2);
}

.btn-secondary {
  background-color: #ffffff;
  color: #1f2937;
  border: 1px solid #d1d5db;
}

.btn-secondary:hover:not(:disabled) {
  background-color: #f9fafb;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.btn-danger:hover:not(:disabled) {
  background-color: #dc2626;
}

.btn-outline-danger {
  border-color: #ef4444;
  background: #ffffff;
  color: #ef4444;
}

.btn-outline-danger:hover:not(:disabled) {
  background: #fef2f2;
  border-color: #ef4444;
}
</style>