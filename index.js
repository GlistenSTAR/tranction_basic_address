const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

// // get address related with mexc adress
// let count = 100, related_address = [];

// const get_related_address = async () => {
//     let fs_address = [];
//     for (var page_num = 1; page_num < count / 100 + 1; page_num++) {
//         await axios({
//             method: 'post',
//             url: "https://joystream.api.subscan.io/api/scan/transfers",
//             headers: {
//                 "Content-Type": "application/json",
//                 "X-API-Key": process.env.SUBSCAN_API,
//             },
//             data: {
//                 "row": 100,
//                 "page": page_num,
//                 "address": process.env.MEXC_ADDRESS
//             }
//         }).then(function (res) {
//             count = res.data.data.count
//             data = res.data.data.transfers ? res.data.data.transfers : false;
//         }).catch(function (error) {
//             data = false
//         });
//         if (data) {
//             data.map((item) => {
//                 if (!related_address.find((el) => el == item.from)) {
//                     related_address.push(item.from)
//                     fs_address.push(item.from)
//                 }
//             })
//         } else {
//             break;
//         }
//     }
//     fs.writeFile('result.json', JSON.stringify(related_address), err => {
//         if (err) {
//             console.error(err);
//         }
//     });
// }

// get_related_address()


