<template>

<div id="input-frame">
    <InputFieldAtom :place-holder="hintText" v-model="input"/>
    <ButtonAtom label="+" @click="addCategoryItem"/>
</div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import ButtonAtom from '../atoms/ButtonAtom.vue';
import InputFieldAtom from '../atoms/InputFieldAtom.vue';

const input = ref()

const props = defineProps({
    hintText: String
})

function addCategoryItem() {
    console.log(`not ready: ${input.value}`)
}

</script>

<style scoped>

#input-frame{
    display: flex;
    justify-content: space-between;
    gap: 30px;
}

</style>