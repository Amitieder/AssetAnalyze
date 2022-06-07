import { Asset } from "../models/asset";

const reader = require('xlsx');
const fs = require('fs');

async function readData() {
    let assets: Array<Asset> = [];
    let buffers: Array<Buffer> = [];

    const fileName = 'C:/Users/amitt/OneDrive/שולחן העבודה/project/Aquant/server/src/assets/ServiceEvents.xlsx';
    const readStream = fs.createReadStream(fileName);
    const onDataPromise = new Promise((resolve: any, reject: any) => {
        readStream.on("data", function (data: Buffer) {
            buffers.push(data);
            resolve();
       });
    });

    await onDataPromise;

    const onEndPromise = new Promise((resolve, reject) => {
        readStream.on("end", function() {
            const buffer = Buffer.concat(buffers);
            const workbook = reader.read(buffer, {
                type: "buffer",
                WTF: true,
                dateNF: "MM-DD-YYYY",
                cellDates: true
            });
    
            const sheetNames = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheetNames[0]];
    
            assets = reader.utils.sheet_to_json(worksheet, {dateNF: "MM-DD-YYYY", raw: false});
            resolve(assets);
        }, {});
    });

    const result = await onEndPromise;
      
    return result;
}

module.exports = readData;

export {};