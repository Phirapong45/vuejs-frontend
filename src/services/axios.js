import axios from 'axios';

const HTTP = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json' //ส่งข้อมูลในรูปแบบ JSON และต้องการให้เซิร์ฟเวอร์ทราบประเภทของข้อมูลที่กำลังถูกส่งไป
    }
});

export { HTTP };
