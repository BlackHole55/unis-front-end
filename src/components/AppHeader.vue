<template>
    <div>Header</div>
    <ul>
        <li><RouterLink to="/">Home</RouterLink></li>
        <li><RouterLink to="/dorms">Dorms</RouterLink></li>
        <li><RouterLink to="/specialties">Specialties</RouterLink></li>
    </ul>
</template>

<script setup>

</script>

<style scoped>
div {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background-color: aqua;
}
</style>