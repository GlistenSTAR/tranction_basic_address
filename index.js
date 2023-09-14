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

const middleAddress = require('./UserAddressOnMEXC.json')
const invest_address = require('./invest_address.json')
const handleList = require('./handle_list.json')
let finial_result = []

example = async () => {
    let a = 0;
    for (addr of middleAddress) {
        await axios({
            method: 'post',
            url: "https://joystream.api.subscan.io/api/scan/transfers",
            headers: {
                "Content-Type": "application/json",
                "X-API-Key": process.env.SUBSCAN_API,
            },
            data: {
                "row": 100,
                "address": addr,
                "direction": "received"
            }
        }).then(function (res) {
            data = res.data.data.transfers
            data.forEach(element => {
                if (invest_address.find((el) => el == element.from)) {
                    handlerName = handleList.find((handle) => {
                        if (handle.roleAccount == element.from) {
                            return handle.membership.handle
                        }
                    })
                    finial_result.push({ id: a++, from: element.from, to: element.to, amount: element.amount, handle: handlerName.membership.handle })
                    console.log("from: " + element.from + " to: " + element.to + " handle: " + handlerName.membership.handle + " amount: " + element.amount)
                }
            });
        }).catch(function (error) {
            console.log(error)
            // console.log("error" + addr)
            data = false
        });
    }
    console.log("finial_result", finial_result)
    fs.writeFile('filtered_result.json', JSON.stringify(finial_result), err => {
        if (err) {
            console.error(err);
        }
        console.log('file saved')
    });
};

example()

// middleAddress.map(async (addr) => {
//     // let r = middleAddressAmount.map(async (item) => {
//     // let count = 1, result_amount = [];
//     // await axios({
//     //     method: 'post',
//     //     url: "https://joystream.api.subscan.io/api/scan/transfers",
//     //     headers: {
//     //         "Content-Type": "application/json",
//     //         "X-API-Key": process.env.SUBSCAN_API,
//     //     },
//     //     data: {
//     //         "row": 1,
//     //         "address": addr,
//     //         "direction": "received"
//     //     }
//     // }).then(async (res) => {
//     //     count = res.data.data.count
//     //     console.log({ "address": addr, "amount": count })
//     //     finial_result.push({ "address": addr, "amount": count })
//     //     return { address: addr, amount: count }
//     // }).catch(function (error) {
//     //     console.log("error " + addr)
//     //     data = false
//     // });
// })

// const finialResult = require("./finial_result.json")