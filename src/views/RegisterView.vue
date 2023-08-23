<template>
    <section>
        <div class="container mt-4">
            <div class="row mt-4">
                <div class="col-sm-4"></div>
                <div class="col-sm-4">
                    <form @submit.prevent>
                        <div class="mb-2">
                            <label for="userEmailInput" class="form-label">Email address</label>
                            <input type="email" class="form-control" id="userEmailInput" v-model="userEmail">
                        </div>
                        <div class="mb-2">
                            <label for="userPasswordInput" class="form-label">Password</label>
                            <input type="password" class="form-control" id="userPasswordInput" v-model="userPassword">
                        </div>
                        <div class="mb-2">
                            <label for="userPasswordInputRepeat" class="form-label">Repeat password</label>
                            <input type="password" class="form-control" id="userPasswordInputRepeat"
                                v-model="userPasswordRepeat">
                        </div>
                        <div v-if="errorMessage !== ''" class="mb-2 alert alert-danger" role="alert">
                            {{ errorMessage }}
                        </div>
                        <div>
                            <button type="submit" class="btn btn-success" @click="registerUser">Register</button>
                        </div>
                    </form>
                </div>
                <div class="col-sm-4"></div>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            userEmail: '',
            userPassword: '',
            userPasswordRepeat: '',
            errorMessage: ''
        }
    },
    methods: {
        async registerUser() {
            try {
                this.errorMessage = "";
                const requestBody = JSON.stringify({ email: this.userEmail, password: this.userPassword, "password-repeat": this.userPasswordRepeat })
                const response = await fetch("http://0.0.0.0:8000/v1/register", { method: "POST", body:  requestBody});
                const data = await response.json();
                if (response.ok) {
                    this.userEmail = '';
                    this.userPassword = '';
                    this.userPasswordRepeat = '';
                    this.$router.replace("/login");
                }
                else {
                    this.userPassword = '';
                    this.errorMessage = data['message'];
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
}
</script>