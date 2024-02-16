<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item><RouterLink to="/">Home</RouterLink></b-nav-item>
                <b-nav-item><RouterLink to="/dorms">Dorms</RouterLink></b-nav-item>
                <b-nav-item><RouterLink to="/specialties">Specialties</RouterLink></b-nav-item>
            </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script setup>

</script>

<!-- <style scoped>
div {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    background-color: aqua;
}
</style> -->