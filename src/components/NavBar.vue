<template>
    <nav class="container-fluid navbar navbar-expand-sm navbar-dark bg-success">
        <div class="container-fluid">
            <router-link to="/" class="navbar-brand">
                <img src="/crispy.png" alt="" width="36" height="34"> Crispy Sentiment
            </router-link>
            <div v-if="!isLoggedIn" class="navbar-nav">
                <router-link to="/login" class="nav-link">Login</router-link>
                <router-link to="/register" class="nav-link">Register</router-link>
                <router-link to="/about" class="nav-link">About</router-link>
            </div>
            <div v-else class="navbar-nav">
                <router-link to="/history" class="nav-link">History</router-link>
                <a @click="logoutUser" class="nav-link" href="#">Logout</a>
                <router-link to="/about" class="nav-link">About</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    computed: {
        isLoggedIn() {
            return this.$store.getters.isAuthenticated;
        }
    },
    methods: {
        logoutUser() {
            const token = this.$store.getters.getUserToken;
            this.$store.dispatch('logout', token);
            
        }
    }
}
</script>
