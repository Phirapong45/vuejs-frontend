<template>
  <img alt="logo" src="./assets/golden.png" style="width: 400px; height: 300px;">
  <checkBalance msg="Intern: e-Wallet"/>
</template>

<script>
import checkBalance from "./components/Balance.vue";

export default {
  name: "App",
  components: {
    checkBalance,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
