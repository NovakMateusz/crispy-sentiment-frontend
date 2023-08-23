<template>
  <main>
    <nav-bar></nav-bar>
    <router-view></router-view>
  </main>
</template>

<script>
</script>

<!-- export default {
  data() {
      return {
          isAnonymous: null,

      }
  },
  beforeUpdate() {
      this.isUserAnonymous();
  },
  methods: {
      isUserAnonymous() {
          console.log(this.$store.getters.isUserAnonymous);
          this.isAnonymous = this.$store.getters.isUserAnonymous;
          console.log(this.$store.getters.isUserAnonymous);
      },
      logoutUser() {
          console.log(this.$store.getters.isUserAnonymous);
          this.$store.commit('logoutUser');
      }
  }
} -->
