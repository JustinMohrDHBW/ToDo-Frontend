<template>
  <div id="outer-div">
    <div id="item">
        <ItemLabel class="col-item" :label="'Todo'" :weight="1.5"/>
        <ItemLabel class="col-item" :label="'Category'" :weight="1.5"/>
        <ItemLabel class="col-item" :label="'Due Date'" :weight="1"/>
        <ItemLabel class="col-item" :label="'Priority'" :weight="1"/>
        <ItemLabel class="col-item" label="Today" :weight="1"/>
        <ItemLabel class="col-item" label="Action" :weight="1.3"/>
    </div>
  </div>
</template>




<script setup lang="ts">
import ItemLabel from '../atoms/ItemLabel.vue';

</script>

<style scoped>
#item {
  display: flex;
  align-items: center;
  border-radius: var(--border-radius-md);
  padding: var(--padding-md);
  gap: 20px;
  margin-top: 40px;

  border-style: solid;
  border-width: 1px;
  border-color: var(--bg-gray-light);
} 

.col-item {
  text-align: center;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 0;
}

#outer-div{
  padding-inline: 10%;
}


</style>