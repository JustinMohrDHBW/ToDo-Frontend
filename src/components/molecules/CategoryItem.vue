<template>

<div id="item-frame" @click="selectItem">
    <p>{{ categoryName }}</p>
    <ButtonAtom label="X"/>
</div>

</template>

<script setup lang="ts">
import ButtonAtom from '../atoms/ButtonAtom.vue';

const emit = defineEmits(['emit'])

const props = defineProps({
    categoryName: String,
    index: Number
})

const index = props.index

function selectItem(){
    emit('emit', props.categoryName);
}

</script>

<style scoped>

#item-frame{
    display: flex;
    background-color: rgb(186, 186, 186);
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    padding: 5px;
    font-size: 0.9rem;
}

#item-frame:hover{
    background-color: rgb(135, 135, 135);;
}

</style>