<template>
    <section>
        <div class="container mt-4">
            <div class="row mt-4">
                <div class="col-4"></div>
                <div class="col-4">
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
                            <input type="password" class="form-control" id="userPasswordInputRepeat" v-model="userPasswordRepeat">
                        </div>
                        <div>
                            <button type="submit" class="btn btn-success">Register</button>
                        </div>
                    </form>
                </div>
                <div class="col-4"></div>
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
            userPasswordRepeat: ''
        }
    },
}
</script>
