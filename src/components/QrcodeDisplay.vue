<template>
    <div class="qrCodePage">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <p>เบอร์โทรศัพท์: {{ phoneNumber }}</p>
        <p>จำนวนเงิน: {{ topupAmount }} บาท</p>
        <h3>SCB QR Code</h3>
        <img :src="qrUrl" alt="QR Code" style="width: 200px; height: 200px; margin-top: -5px;">
        <p v-if="countdown > 0">กรุณาทำรายการในเวลา: {{ countdown }} วินาที</p>
    </div>
</template>

<script>
import { HTTP } from "@/services/axios.js";

export default {
    name: 'qrcodeDisplay',
    data() {
        return {
            phoneNumber: this.$route.query.phoneNumber || '',
            topupAmount: this.$route.query.topupAmount || '',
            qrUrl: this.$route.query.qrUrl || '',
            totalBalance: 0, // เพิ่มตัวแปรเพื่อเก็บยอดเงิน
            countdown: 60, // เวลานับถอยหลัง 1 นาที (60 วินาที)
        };
    },
    methods: {
        goBack() {
            this.$router.push('/homePage');
        },
        async checkBalance() {
            try {
                const response = await HTTP.get(`/balance?phoneNumber=${this.phoneNumber}`);
                return response.data.totalBalance; 
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
                return null;
            }
        },
        async sendPhoneNumber() {
            const phoneNumber = String(this.phoneNumber);
            console.log('phoneNumber:', phoneNumber);

            try {
                const initialBalance = await this.checkBalance();
                if (initialBalance !== null) {
                    this.totalBalance = initialBalance;

                    // เริ่มต้นการนับถอยหลัง
                    const intervalId = setInterval(async () => {
                        this.countdown -= 1;

                        if (this.countdown <= 0) {
                            clearInterval(intervalId);
                            const newBalance = await this.checkBalance();
                            if (newBalance !== null && newBalance > this.totalBalance) {
                                alert(`เติมเงินสำเร็จ! ยอดเงินปัจจุบัน: ${this.totalBalance} --> ${newBalance} บาท`);
                                this.goBack(); // กลับไปหน้าแรก
                            } else {
                                alert('คุณไม่ได้ทำรายการภายในเวลาที่กำหนด กรุณาทำรายการใหม่!');
                                this.goBack(); // กลับไปหน้าแรก
                            }
                        } else {
                            const newBalance = await this.checkBalance();
                            if (newBalance !== null && newBalance > this.totalBalance) {
                                clearInterval(intervalId); // หยุดการนับถอยหลังเมื่อพบยอดเงินเพิ่ม
                                alert(`เติมเงินสำเร็จ! ยอดเงินปัจจุบัน: ${this.totalBalance} --> ${newBalance} บาท`);
                                this.goBack(); // กลับไปหน้าแรก
                            }
                        }
                    }, 1000); // 1 วินาที
                }
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
    },
    mounted() {
        this.sendPhoneNumber();
    }
};
</script>

<style scoped>
h3 {
    margin: 30px 0 0;
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
