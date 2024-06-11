<template>
    <div class="fillTopup">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <h1>{{ msg }}</h1>
        <h3>Admin</h3>
        <p>กรุณากรอกเบอร์โทรศัพท์และจำนวนเงิน</p>
        <input type="text" name="phoneNumber" v-model="phoneNumber" placeholder="เบอร์โทรศัพท์" />
        <br>
        <input type="text" name="topupAmount" v-model="topupAmount" placeholder="จำนวนเงิน" />
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
            try {
                const response = await HTTP.patch('http://localhost:8080/admin', {
                    phoneNumber: this.phoneNumber,
                    topupAmount: this.topupAmount
                });
                if (response.data && response.data.phoneNumber && response.data.totalBalance) {  //ตรวจสอบว่าข้อมูลที่ได้รับกลับมาจากเซิร์ฟเวอร์มีครบไหม
                    this.balanceMessage = response.data;
                    alert(`เติมเงินสำเร็จ!`);
                }
            } catch (error) {
                console.error('Error:', error.response || error.message || error);
                alert('ไม่พบเบอร์ในระบบ');
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
