<template>
    <div class="fillTopup">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <h3>QR Code topup</h3>
        <p>กรุณากรอกเบอร์โทรศัพท์และจำนวนเงิน</p>
        <input type="text" name="phoneNumber" v-model="phoneNumber" placeholder="เบอร์โทรศัพท์" />
        <br>
        <input type="text" name="topupAmount" v-model="topupAmount" placeholder="จำนวนเงิน" />
        <br>
        <div v-if="phoneNumber && topupAmount">
            <button @click="qrcodeTopup">เติมเงิน</button>
        </div>
        <img v-if="qrUrl" :src="qrUrl" alt="QR Code" style="width: 200px; height: 200px; margin-top: 20px;">
    </div>
</template>

<script>
import { HTTP } from "@/services/axios.js";

export default {
    name: 'QrcodeTopup',
    data() {
        return {
            phoneNumber: '',
            topupAmount: '',
            qrUrl: '' 
        };
    },
    methods: {
        async qrcodeTopup(){
            if (!/^\d+$/.test(this.phoneNumber)) {  
                alert("รูปแบบหมายเลขโทรศัพท์ไม่ถูกต้อง");
                return;
            }

            const topupAmount = parseInt(this.topupAmount);
            if (isNaN(topupAmount) || topupAmount < 100 || topupAmount > 1000) {
                alert('จำนวนเงินต้องอยู่ระหว่าง 100 ถึง 1000');
                return;
            }
            try {
                const response = await HTTP.post('/qrcode', {
                    phoneNumber: this.phoneNumber,
                    topupAmount: topupAmount
                });
                // หลังจากที่ส่ง request เรียบร้อยแล้ว อัพเดท qrImageUrl เพื่อแสดง QR Code
                console.log(response.data,"ok")
                if (response.data && response.data.qrUrl) {
                    this.qrUrl = response.data.qrUrl;
                    alert('แสดง QR สำเร็จ!');
                }
            } catch (error) {
                console.error('Error:', error.response || error.message || error);
                alert('ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
            }
        },
        goBack() {
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
</style>
