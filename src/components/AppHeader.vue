<template>
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand"><RouterLink to="/"><h3 class="mt-1">Unis</h3></RouterLink></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page"><RouterLink to="/">Home</RouterLink></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><RouterLink to="/dorms">Dorms</RouterLink></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><RouterLink to="/specialties">Specialties</RouterLink></a>
                </li>
                <li>
                    <a class="nav-link py-2" id="admin"  v-if="!isLogged"><RouterLink to="/admin/main">Admin</RouterLink></a>
                </li>
                <li class="nav-item dropdown" id="dropdown" v-if="isLogged"> 
                    <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                        <li><a class="dropdown-item"><RouterLink to="/admin/main">Main</RouterLink></a></li>
                        <li><a class="dropdown-item">Dorms</a></li>
                        <li><a class="dropdown-item">Specialties</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" id="logOut" @click="logOut">Log out</a></li>
                    </ul>
                </li>
            </ul>
            <!-- <div id="nav-admin">
                <a class="nav-link py-2" id="logOut" v-if="isLogged" @click="logOut">Log out</a>
                <a class="nav-link py-2" id="admin"><RouterLink to="/admin/main">Admin</RouterLink></a>
            </div> -->
        </div>
    </div>
</nav>
</template> 

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
    setup(){
        const store = useStore();

        const isLogged = computed(() => store.getters["admin/isLogged"]);

        function logOut() {
            store.dispatch("admin/logOut");
        }

        return {
            isLogged,
            logOut,
        }
    }
}
</script>

<style scoped>
@media (max-width: 991.98px) {
    .nav-link {
        text-align: center;
    }
}
@media (min-width: 991.98px) {
    /* #dropdown {
        display: flex;
        position: relative;
        right: 0em;
    } */
    #logOut {
        padding-right: 1rem;
    }
}
.dropdown-item {
    cursor: pointer;
}

.dropdown-menu {
    background-color: #008080;
}
.dropdown-item:hover {
    background-color: #008080;
}

nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #008080;
    color: #fffdd0;
}
nav:hover {
    color: #eeebad;
}

a {
    color: #fffdd0;
}
a:hover {
    color: #eeebad;
}

</style>