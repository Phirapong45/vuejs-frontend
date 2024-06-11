<template>
  <div class="homePage">
    <p>ยินดีต้อนรับ</p>
    <router-link to="/checkBalance" class="router-button">ตรวจสอบยอดเงิน</router-link>
    <router-link to="/userTopup" class="router-button">เติมเงิน</router-link>
  </div>
</template>

<script>
export default {
  name: 'homePage',
  props: {
    msg: String
  },
  methods: {
    navigateTocheckBalance() {
      this.$router.push('/checkBalance');
    },
    navigateToUser() {
      this.$router.push('/user');
    }
  }
};
</script>

<style scoped>
h1 {
  margin: 40px 0 0;
}

.router-button {
  display: inline-block;
  padding: 10px 20px;
  width: 20%;
  background-color: #2a78ec;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  margin-right: 10px;
  text-decoration: none;
}

.router-button:hover {
  background-color: #2d71d6;
}
</style>
