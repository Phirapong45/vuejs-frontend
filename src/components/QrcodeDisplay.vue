<template>
    <div class="qrCodePage">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <p>เบอร์โทรศัพท์: {{ phoneNumber }}</p>
        <p>จำนวนเงิน: {{ topupAmount }} บาท</p>
        <h3>SCB QR Code</h3>
        <div class="qrCodeContainer">
            <img :src="qrUrl" alt="QR Code" class="qrCodeImage">
            <p v-if="countdown > 0" class="countdownText">กรุณาทำรายการภายในเวลา: {{ countdown }} วินาที</p>
        </div>
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
            totalBalance: 0,
            countdown: 60,
        };
    },
    methods: {
        goBack() {
            // ลบข้อมูลนับถอยหลังจาก localStorage
            localStorage.removeItem('countdown');
            this.$router.push('/homePage').then(() => {
                // ใช้ setTimeout เพื่อรอให้ navigation เสร็จสิ้นก่อนที่จะรีเฟรช
                setTimeout(() => {
                    window.location.reload();
                }, 300);
            });
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
            try {
                this.totalBalance = await this.checkBalance();
                if (this.totalBalance !== null) {
                    // กำหนดเวลานับถอยหลังจาก localStorage
                    const savedCountdown = localStorage.getItem('countdown');
                    if (savedCountdown) {
                        this.countdown = parseInt(savedCountdown, 10);
                    }

                    // เริ่มต้นการนับถอยหลัง
                    const intervalId = setInterval(async () => {
                        this.countdown -= 1;

                        // บันทึกค่าของ countdown ลง localStorage
                        localStorage.setItem('countdown', this.countdown);

                        const newBalance = await this.checkBalance();
                        if (newBalance !== null && newBalance > this.totalBalance) {
                            clearInterval(intervalId); // หยุดการนับถอยหลังเมื่อพบยอดเงินเพิ่ม
                            this.showSuccessMessage(newBalance);
                        } else if (this.countdown <= 0) {
                            clearInterval(intervalId);
                            if (newBalance <= this.totalBalance) {
                                alert('คุณไม่ได้ทำรายการภายในเวลาที่กำหนด กรุณาทำรายการใหม่!');
                            }
                            this.goBack(); // กลับไปหน้าแรก
                        }
                    }, 1000); // 1 วินาที 
                }
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        },
        showSuccessMessage(newBalance) {
            alert(`เติมเงินสำเร็จ! \nยอดเงินปัจจุบัน: ${this.totalBalance} --> ${newBalance} บาท`);
            this.goBack(); // กลับไปหน้าแรก
        }
    },
    mounted() {
        this.sendPhoneNumber();

        // ใช้ $nextTick เพื่อรอให้ DOM อัพเดตเสร็จสิ้นก่อนที่จะเลื่อนหน้า
        this.$nextTick(() => {
            const countdownElement = this.$el.querySelector('.countdownText');
            if (countdownElement) {
                countdownElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
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

.qrCodeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.qrCodeImage {
    width: 200px;
    height: 200px;
    margin-top: -5px;
}

.countdownText {
    margin-top: -10px; /* Adjust spacing as needed */
}
</style>
