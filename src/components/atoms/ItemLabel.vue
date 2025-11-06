<template>

    <div id="container" :style="{flexGrow: weight}" @click.stop>
        <p>{{ props.label }}</p>
    </div>

</template>

<script setup lang="ts">
const props = defineProps<{
    label: string; 
    widthInPercent?: number
    weight?:number
}>();
const weight = props.weight ?? 1

</script>

<style scoped>
#container {
    min-width: 0; 
    flex-shrink: 0;
    flex-basis: 0;
    display: flex; 
    align-items: center;
    width: 100%;
    pointer-events: none;
}

p {
    white-space: nowrap; 
    margin: 0;
    color: #333333;
    overflow: hidden; 
    text-overflow: ellipsis; 
    width: 100%; 
}
</style>