<template>

    <div id="item">
        <ItemLabel label="Hausaufgbanen" :width-in-percent="60"/>
        <ItemLabel label="12.09.2025" :width-in-percent="10"/>
        <ItemLabel label="High" :width-in-percent="10"/>
        <div>
            <ButtonAtom label="edit"/>
            <ButtonAtom label="done"/>
        </div>
    </div>

</template>


<script setup lang="ts">
import ButtonAtom from '../atoms/ButtonAtom.vue';
import ItemLabel from '../atoms/ItemLabel.vue';
</script>

<style scoped>

#item {
    display: flex;
    background-color: rgb(186, 186, 186);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
}

</style>