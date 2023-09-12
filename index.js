const axios = require('axios');
const fs = require('fs');
const readline = require('linebyline')

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
//                 "address": process.env.MEXC_ADDRESS,
//                 "direction": "received"
//             }
//         }).then(function (res) {
//             count = res.data.data.count
//             data = res.data.data.transfers ? res.data.data.transfers : false;
//         }).catch(function (error) {
//             data = false
//             console.log(error)
//         });
//         if (data) {
//             data.map((item) => {
//                 if (!related_address.find((el) => el == item.from)) {
//                     if (item.to == process.env.MEXC_ADDRESS) {
//                         related_address.push(item.from)
//                         fs_address.push(item.from)
//                     }
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
//         console.log('file saved')
//     });
// }
// get_related_address()


const result_data = require('./result.json')
const invest_address = require('./invest_address.json')
let finial_result = []
let r = result_data.slice(0, 20).map(async (addr) => {
    let count = 1;
    await axios({
        method: 'post',
        url: "https://joystream.api.subscan.io/api/scan/transfers",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.SUBSCAN_API,
        },
        data: {
            "row": 1,
            "address": addr,
            "direction": "received"
        }
    }).then(function (res) {
        count = res.data.data.count
        console.log(count)
    }).catch(function (error) {
        console.log(error)
        data = false
    });
    await axios({
        method: 'post',
        url: "https://joystream.api.subscan.io/api/scan/transfers",
        headers: {
            "Content-Type": "application/json",
            "X-API-Key": process.env.SUBSCAN_API,
        },
        data: {
            "row": count,
            "address": addr,
            "direction": "received"
        }
    }).then(function (res) {
        data = res.data.data.transfers
        data.forEach(element => {
            if (invest_address.find((el) => el == element.from)) {
                finial_result.push({ address: element.from, amount: element.amount })
                console.log(element.from, element.to, element.amount)
            }
        });
    }).catch(function (error) {
        data = false
    });
    return true;
})
console.log(r)


