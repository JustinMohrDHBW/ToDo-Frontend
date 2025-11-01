<script setup lang="ts">

</script>

<template>

  <div id="item-view">
    <slot></slot>
  </div>

</template>


<style scoped>
#item-view {
  padding-inline: 10%;
  padding-block: 50px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>