<template>
    <main>
        <nav-bar></nav-bar>
        <router-view></router-view>
    </main>
</template>


<script>
    export default {

    }
</script>

<style>
/* check-box */
.form-check-input:checked {
    background-color: #198754;
    border-color: #198754;
}
.form-check-input:active {
    background-color: #157347;
    border-color: #146c43;
    box-shadow: 0 0 0 0.25rem rgb(60 153 110 / 50%);
}
.form-check-input:focus {
    background-color: #157347;
    border-color: #146c43;
    box-shadow: 0 0 0 0.25rem rgb(60 153 110 / 50%);
}
/* textarea and input text */
.form-control:focus {
    box-shadow: 0 0 0 0.25rem rgb(60 153 110 / 50%);
    border-color: #146c43;
}
</style>