import { Asset } from "../models/asset";

const express = require('express');
const assetAnalyzeController = require('./assetAnalyzeController');
const readData = require('./assetAnalyzeModel');
const assetAnalyzeRouter = express.Router();

let data: Array<Asset> = [];

(async () => { 
    data = await readData()
})();

assetAnalyzeRouter.get('/', async function (req: any, res: any) {
    const assetIdToMonthsMap = assetAnalyzeController.getAssetIdToMonthsMap(data);
    res.send(assetIdToMonthsMap);   
});

module.exports = assetAnalyzeRouter;

export {};