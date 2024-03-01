<template>
<nav class="navbar navbar-expand-lg navbar-dark">
    <div class="container-fluid">
        <a class="navbar-brand"><RouterLink to="/"><h3>Unis</h3></RouterLink></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-3 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link" aria-current="page"><RouterLink to="/">Home</RouterLink></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><RouterLink to="/dorms">Dorms</RouterLink></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link"><RouterLink to="/specialties">Specialties</RouterLink></a>
                </li>
            </ul>
            <a class="nav-link" id="admin"><RouterLink to="Admin">Admin</RouterLink></a>
        </div>
    </div>
</nav>
</template> 


<style scoped>
@media (max-width: 991.98px) {
    #admin {
        position: relative;
        bottom: 0.5rem;
        text-align: center;
    }
    .navbar-nav {
        text-align: center;
    }
}
nav {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #008080;
}

a {
    color: #fffdd0;
}
a:hover {
    color: #eeebad;
}
</style>