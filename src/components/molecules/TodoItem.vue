<template>

    <div id="item">
        <ItemLabel label="Hausaufgbanen" :width-in-percent="60"/>
        <ItemLabel label="12.09.2025" :width-in-percent="10"/>
        <ItemLabel label="High" :width-in-percent="10"/>
        <div>
            <button>edit</button>
        </div>
    </div>

</template>


<script setup lang="ts">
import ItemLabel from '../atoms/ItemLabel.vue';
</script>

<style scoped>

#item {
    display: flex;
    background-color: grey;
    justify-content: space-between;
    padding: 10px;
    border-radius: 10px;
}

</style>