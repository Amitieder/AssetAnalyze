<template>
    <div class="app">
      <div class="asset-id-container">
        <label for="asset-id">Asset id</label>
        <select v-model="selectedAssetId" @change="onSelectAsset" class="asset-id">
          <option v-for="assetId in assetIds" :key="assetId">{{assetId}}</option>
        </select>
      </div>
      <div class="visit-year-container" v-if="selectedAssetId">
        <label for="visit-year">Visit year</label>
        <select v-model="selectedYear" @change="onSelectYear" class="visit-year">
          <option v-for="year in visitYears" :key="year">{{year}}</option>
        </select>
      </div>
      <div class="data-container">
        <div class="customer-name-container">
          <p>Customer Name:</p>
          <p class="customer-name">{{customerName}}</p>
        </div>
        <div class="manufacturer-container">
          <p>Manufacturer:</p>
          <p class="manufacturer">{{manufacturer}}</p>
        </div>
        <div class="model-container">
          <p>Model:</p>
          <p class="model">{{model}}</p>
        </div>
      </div>
      <chart class="chart" :assetsDataPerYear="assetsDataPerYear"></chart>
    </div>
</template>

<script>
    import Chart from "./chart/Chart.vue";
    
    export default {
        components: {
          Chart
        },
        data() {
            return {
              assetsData: {},
              assetIds: [],
              visitYears: new Set(),
              assetsDataPerYear: {},
              selectedAssetId: '',
              selectedYear: null,
              customerName: '',
              manufacturer: '',
              model: ''
            }
        },
        async created() {
          const res = await fetch("http://localhost:3000/get-assets", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });
      
          if (res.ok) {
              this.assetsData = await res.json();
              this.assetIds = Object.keys(this.assetsData);
              this.selectedAssetId = this.assetIds[0];
              this.initVisitYearsOptions();
              this.initAssetsDataPerYear();
          }
        },
        methods: {
          initAssetsDataPerYear() {
            this.assetsDataPerYear = this.assetsData[this.selectedAssetId][this.selectedYear];
            this.initDataPerAsset();
          },
          initDataPerAsset() {
            const yearKeys = Object.keys(this.assetsData[this.selectedAssetId]);
            const monthKeys = Object.keys(this.assetsData[this.selectedAssetId][yearKeys[0]]);
            const monthData = this.assetsData[this.selectedAssetId][yearKeys[0]][monthKeys[0]];

            this.customerName = monthData.customerName;
            this.manufacturer = monthData.manufacturer;
            this.model = monthData.model;
          },
          initVisitYearsOptions(){
            this.visitYears = Object.keys(this.assetsData[this.selectedAssetId]).filter((year) => year != 0);
            this.selectedYear = this.visitYears[0];
          },
          onSelectAsset() {
            this.initVisitYearsOptions();
            this.initAssetsDataPerYear();
          },
          onSelectYear() {
            this.initAssetsDataPerYear();
          }
        }
      }
</script>

<style>
    .app {
        text-align: center;
        font-family: Trebuchet MS;
    }

    .asset-id {
      margin-left: 10px;
    }

    .visit-year {
      margin-left: 10px;
    }

    .chart {
      margin-top: 30px;
    }

    .visit-year-container {
      margin-top: 15px;
    }

    .customer-name-container{
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }

    .manufacturer-container {
      display: flex;
      justify-content: center;
      margin-top: -20px;
    }

    .model-container {
      display: flex;
      justify-content: center;
      margin-top: -20px;
    }

    .model {
      margin-left: 10px;
    }

    .customer-name {
      margin-left: 10px;
    }

    .manufacturer {
      margin-left: 10px;
    }

    .data-container {
     
    }
</style>