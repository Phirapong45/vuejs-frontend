<template>
  <div id="app">
  <img alt="logo" src="./assets/e-wallet.png" style="width: 400px; height: 300px;">
  <h1>Intern: e-Wallet</h1> 
    <router-view></router-view> <!-- Vue Router จะใช้ <router-view> ในการแสดง component เหล่านั้น เมื่อ URL ตรงกับ route ที่กำหนด -->
  </div>
</template>

<script>
export default {
  name: "App",
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
