<template>
    <div class="fillBalance">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <h1>{{ msg }}</h1>
        <p>กรุณากรอกเบอร์โทรศัพท์เพื่อเช็คยอดเงิน</p>
        <input type="text" name="phoneNumber" v-model="phoneNumber" placeholder="เบอร์โทรศัพท์" />
        <br>
        <div class="fillBalance" v-if="phoneNumber">
            <button @click="checkBalance">ตรวจสอบยอดเงิน</button>
        </div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
    </div>

    <div class="showBalance" v-if="balanceMessage && phoneNumber">
        <h2>{{ balanceMessage.phoneNumber }}</h2>
        <h3>Total Balance: {{ balanceMessage.totalBalance }}</h3>
    </div>
    <div v-else-if="balanceMessage === false && phoneNumber">
        <h2>{{ phoneNumber }}</h2>
        <p>ไม่พบเบอร์ในระบบ</p>
    </div>
</template>

<script>
import { HTTP } from "@/services/axios.js";

export default {
    name: 'checkBalance',
    props: {
        msg: String
    },
    data() {
        return {
            phoneNumber: '',
            balanceMessage: null,
            errorMessage: ''
        };
    },
    watch: {  //watch property ของ Vue.js จาก https://medium.com/@thehoistory/vue-js-%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%82%E0%B8%B3%E0%B8%82%E0%B8%B3-c7c2143d2ee2
        phoneNumber(newVal, oldVal) {
            if (newVal.length < oldVal.length) {
                this.balanceMessage = null;
            }
            if (newVal === '') {
                this.balanceMessage = null;
            }
        }
    },
    methods: {
        async checkBalance() {
            if (!/^\d+$/.test(this.phoneNumber)) {
                alert("รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง");
                return;
            }
            this.errorMessage = '';
            try {
                const response = await HTTP.get(`/balance?phoneNumber=${this.phoneNumber}`);
                if (response.data && response.data.phoneNumber && response.data.totalBalance) { //ตรวจสอบว่าข้อมูลที่ได้รับกลับมาจากเซิร์ฟเวอร์มีครบไหม
                    this.balanceMessage = response.data;
                }
            } catch (error) {
                console.error(error);
                this.balanceMessage = false;
            }
        },
        goBack() {  //กลับไปยัง home page
            this.$router.push('/homePage');
        }
    }
};
</script>

<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #2a78ec;
}

input {
    margin: 10px 0;
    padding: 5px;
    width: 200px;
    font-size: 12px;
}

button {
    padding: 5px 10px;
    width: 215px;
    background-color: #2a78ec;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #2d71d6;
}

.backButton {
    position: absolute;
    top: 10px;
    left: 10px;
}

.error {
    color: red;
    margin-top: 10px;
}
</style>
