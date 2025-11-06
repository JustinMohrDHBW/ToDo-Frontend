<template>

    <div id="input-frame">
        <InputFieldAtom :place-holder="hintText" v-model="newCategoryName" />
        <ButtonAtom label="+" @click="addCategory"
            :disabled="newCategoryName.trim() === ''" />
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import InputFieldAtom from '../atoms/InputFieldAtom.vue';
import ButtonAtom from '../atoms/ButtonAtom.vue';

const emit = defineEmits(['add-category']);

const newCategoryName = ref('');

const props = defineProps({
    hintText: String
})

function addCategory(){

    const callback = () => {
        newCategoryName.value=""
    }
    emit('add-category', newCategoryName.value, callback)
}

</script>

<style scoped>
#input-frame {
    display: flex;
    justify-content: space-between;
    gap: 30px;
}
</style>