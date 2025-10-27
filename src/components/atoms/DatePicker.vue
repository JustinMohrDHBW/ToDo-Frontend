<template>

    <input 
        type="date"
        :v-model="model"
    />

</template>

<script setup lang="ts">

const model = defineModel<string>()

</script>

<style scoped>
.date-input {
    /* Layout & Abstände */
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

    /* Basis-Stile (Light Mode) */
    color: rgb(17 24 39); /* text-gray-900 */
    background-color: rgb(249 250 251); /* bg-gray-50 */
    border-width: 1px;
    border-color: rgb(209 213 219); /* border border-gray-300 */
    border-radius: 10px; /* rounded-lg */
    
    /* Erzwingt das Light-Farbschema für Browser-UI-Elemente (z.B. Kalender-Icon) */
    color-scheme: light; 
}

/* Fokus-Stile */
.date-input:focus {
    outline: none; /* focus:outline-none */
    border-color: transparent; /* focus:border-transparent */
    box-shadow: 0 0 0 2px rgb(99 102 241); /* focus:ring-2 & focus:ring-indigo-500 */
}

</style>