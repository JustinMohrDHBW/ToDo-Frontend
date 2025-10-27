<template>
    <input 
        type="number"
        v-model="model"
        class="number-input"
    />
</template>

<script setup lang="ts">
// Diese Zeile erstellt die v-model-Bindung.
// 'number' wird für den Wert verwendet und 'null', falls das Feld leer ist.
const model = defineModel<number | null>()
</script>

<style scoped>
.number-input {
    width: 100%;
    padding: 0.75rem 1rem; /* 12px 16px */
    font-family: inherit; /* Verwendet die Schriftart der Seite */
    font-size: 1rem;
    color: rgb(17 24 39);
    background-color: rgb(249 250 251);
    border-width: 1px;
    border-color: rgb(209 213 219);
    border-radius: 10px;
}

/* Fokus-Stile */
.number-input:focus {
    outline: none;
    border-color: transparent;
    box-shadow: 0 0 0 2px rgb(99 102 241);
}

/* Optional: Versteckt die Pfeile (Spin-Buttons) im Input-Feld */
.number-input::-webkit-outer-spin-button,
.number-input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

.number-input[type=number] {
    -moz-appearance: textfield; /* Firefox */
}

</style>