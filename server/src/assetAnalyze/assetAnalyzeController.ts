import { Asset } from "../models/asset";

function completeDataById(data: Array<Asset>) {
    data.forEach((asset: Asset) => {
        
    });
}

function getAssetIdToMonthsMap(data: Array<Asset>) {
    const assetIdToMonthsMap = data.reduce((dic: any, asset: Asset) => {
        const assetId: string = asset.asset_id;

        if(assetId) {
            let month: number = 0;
            let year: number = 0;
            
            const visitDateString = asset.visit_date;
            const visitDate = new Date(visitDateString);
            
            if(visitDateString) {
                month = visitDate.getMonth() + 1;
                year = visitDate.getFullYear();
            }

            if(!dic[assetId]) {
                dic[assetId] = {};
            }

            if(!dic[assetId][year]) {
                dic[assetId][year] = {};
            }

            if(!dic[assetId][year][month]) {
                dic[assetId][year][month] = {
                    customerName: asset.Customer_name,
                    manufacturer: asset.Manufacturer,
                    model: asset.Model,
                    numberOfVisits: 0,
                    numberOfPartsReplaced: 0
                }
            }

            if(visitDateString) {
                dic[assetId][year][month].numberOfVisits += 1;
            }

            dic[assetId][year][month].numberOfPartsReplaced += asset.part_quantity;
        }

        return dic;
    }, {});

    return assetIdToMonthsMap;
}

module.exports = {
    getAssetIdToMonthsMap,
    completeDataById
};

export {};