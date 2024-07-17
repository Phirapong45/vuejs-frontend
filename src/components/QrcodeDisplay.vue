<template>
    <div class="qrCodePage">
        <button class="backButton" @click="goBack">กลับไปยังหน้าแรก</button>
        <h3>QR Code</h3>
        <img :src="qrUrl" alt="QR Code" style="width: 200px; height: 200px; margin-top: 20px;">
    </div>
</template>

<script>
export default {
    name: 'qrcodeDisplay',
    data() {
        return {
            qrUrl: this.$route.query.qrUrl || ''
        };
    },
    methods: {
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