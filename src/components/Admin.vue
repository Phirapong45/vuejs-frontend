<template>
    <div class="fillTopup">
        <!-- <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button> -->
        <h3>Admin</h3>
        <p>กรุณากรอกเบอร์โทรศัพท์และจำนวนเงิน</p>
        <input type="text" name="phoneNumber" v-model="phoneNumber" placeholder="เบอร์โทรศัพท์" /> <!-- v-model เพื่อเชื่อมโยงข้อมูลที่ผู้ใช้ป้อนไปที่ phoneNumber -->
        <br>
        <input type="text" name="topupAmount" v-model="topupAmount" placeholder="จำนวนเงิน" /> <!-- v-model เพื่อเชื่อมโยงข้อมูลที่ผู้ใช้ป้อนไปที่ topupAmount -->
        <br>
        <div v-if="phoneNumber && topupAmount">
            <button @click="adminTopup">เติมเงิน</button>
        </div>
    </div>
</template>

<script>
import { HTTP } from "@/services/axios.js";

export default {
    name: 'adminTopup', //http://localhost:3000/adminTopup
    props: {
        msg: String
    },
    data() {
        return {
            phoneNumber: '',
            topupAmount: ''
        };
    },
    methods: {
        async adminTopup() {
            if (!/^\d+$/.test(this.phoneNumber)) {  // ตรวจสอบว่าหมายเลขโทรศัพท์มีเฉพาะตัวเลข
                alert("รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง");
                return;
            }

            const topupAmount = parseInt(this.topupAmount);
            if (isNaN(topupAmount) || topupAmount < 100 || topupAmount > 1000) { // ตรวจสอบช่วงระหว่าง 100-1000
                alert('จำนวนเงินต้องอยู่ระหว่าง 100 ถึง 1000');
                return;
            }

            try {
                const response = await HTTP.patch('http://localhost:8080/admin', {
                    phoneNumber: this.phoneNumber,
                    topupAmount: topupAmount
                });
                if (response.data && response.data.phoneNumber && response.data.totalBalance) {
                    this.balanceMessage = response.data;
                    alert('เติมเงินสำเร็จ!');
                }
            } catch (error) {
                console.error('Error:', error.response || error.message || error);
                alert('ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
            }
        },
        goBack() {
            this.$router.push('/');
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
</style>
