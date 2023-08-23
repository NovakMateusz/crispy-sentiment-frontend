<template>
    <div class="mt-4">
        <div class="row">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
                <form @submit.prevent="loginUser">
                    <div class="mb-2">
                        <label for="userEmailInput" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="userEmailInput" v-model="userEmail" />
                    </div>
                    <div class="mb-2">
                        <label for="userPasswordInput" class="form-label">Password</label>
                        <input type="password" class="form-control" id="userPasswordInput" v-model="userPassword" />
                    </div>
                    <div v-if="errorMessage !== ''" class="mb-2 alert alert-danger" role="alert">
                        {{ errorMessage }}
                    </div>
                    <div>
                        <button type="submit" class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
            <div class="col-sm-4"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userEmail: "",
            userPassword: "",
            errorMessage: ""
        }
    },
    methods: {
        async loginUser() {
            try {
               await this.$store.dispatch('login', { email: this.userEmail, password: this.userPassword })
               this.userEmail = '';
                this.userPassword = '';
                this.$router.replace("/");
            } catch (error) {
                this.errorMessage = error.message;
            }   
            
        }
    }
}
</script>
