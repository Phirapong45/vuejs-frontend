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
    </div>
</template>

<script>
import { HTTP } from "@/services/axios.js";

export default {
    name: 'QrcodeTopup',
    data() {
        return {
            phoneNumber: '',
            topupAmount: ''
        };
    },
    methods: {
        goBack() {
            this.$router.push('/homePage');
        },
        async qrcodeTopup() {
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
                //ตรวจสอบว่าเบอร์โทรศัพท์มีในระบบหรือไม่
                const response = await HTTP.get(`/balance?phoneNumber=${this.phoneNumber}`);

                if (response.data && response.data.totalBalance) {
                    //เบอร์โทรศัพท์มีในระบบ ให้สร้าง QR code
                    const response = await HTTP.post('/qrcode', { // ส่งเบอร์และยอดเงิน
                        phoneNumber: this.phoneNumber,
                        topupAmount: topupAmount
                    });

                    if (response.data && response.data.qrUrl) {
                        const qrUrl = response.data.qrUrl.qrImageUrl; //ดึงค่า qrImageUrl จาก qrUrl
                        const phoneNumberFromData = response.data.qrUrl.phoneNumber; //ดึงเบอร์โทรศัพท์ จาก qrUrl

                        if (phoneNumberFromData === this.phoneNumber) {
                            this.$router.push({ path: '/qrcodeDisplay', query: { phoneNumber: this.phoneNumber, topupAmount: this.topupAmount, qrUrl } }); // ส่งเบอร์และ qr ไปที่ QrcodeDisplay
                        }
                    }
                }
            } catch (error) {
                console.error('Error:', error.response || error.message || error);
                alert('ไม่พบเบอร์โทรศัพท์นี้ในระบบ');
                window.location.reload(); //รีเฟรชหน้า
            }
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
