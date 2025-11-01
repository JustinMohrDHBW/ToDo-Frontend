<template>
  <div :class="wrapperClass">
    <p :class="messageClass">{{ props.message }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message: string
  variant: 'bigScreenCongratulations' | 'bigScreen' | 'popup'
}>()

const wrapperClass = computed(() => `wrapper-${props.variant}`)
const messageClass = computed(() => `message-${props.variant}`)

</script>

<style scoped>
.wrapper-bigScreen,
.wrapper-bigScreenCongratulations {
  text-align: center;
  padding: 60px 20px;
}

.message-bigScreenCongratulations {
  font-size: 20px;
  font-weight: 600;
  color: #10b981;
  margin: 0;
}


.wrapper-popup {
  text-align: center;
  padding: 20px;
  width: 100%;
}

.message-popup {
  font-size: 14px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}

.message-bigScreen {
  font-size: 16px;
  font-weight: 500;
  color: #6b7280;
  margin: 0;
}
</style>