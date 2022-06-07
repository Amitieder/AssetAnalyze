<template>
    <div class="app">
      <BarChart :chart-data="chartData" />
    </div>
</template>

<script>
    import {BarChart} from "vue-chart-3";
    import {Chart, BarController, CategoryScale, BarElement, LinearScale, Legend } from "chart.js";

    Chart.register(BarController, CategoryScale, BarElement, LinearScale, Legend);

    export default {
        components: {
          BarChart
        },
        props: ['assetsDataPerYear'],
        data() {
            return {
                chartData: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: []
                },
                numberOfVisits: {
                    label: 'Number of visits',
                    data: [],
                    backgroundColor: '#2aa198'
                },
                numberOfPartsReplaced: {
                    label: 'Number of parts replaced',
                    data: [],
                    backgroundColor: '#268bd2'
                }
            }
        },
        watch: {
            assetsDataPerYear() {
                this.chartData.datasets = [];
                this.numberOfVisits.data = [];
                this.numberOfPartsReplaced.data = [];

                for(let i = 1; i <= 12; i++) {
                    let monthVisits = 0;
                    let monthPartsReplaced = 0;
                    
                    const currMonth = this.assetsDataPerYear[i];
                    
                    if(currMonth) {
                        monthVisits = currMonth.numberOfVisits;
                        monthPartsReplaced = currMonth.numberOfPartsReplaced;
                    }

                    this.numberOfVisits.data.push(monthVisits);
                    this.numberOfPartsReplaced.data.push(monthPartsReplaced);
                }

              this.chartData.datasets.push(this.numberOfVisits);
              this.chartData.datasets.push(this.numberOfPartsReplaced);
            }
        }
    }
</script>

<style>
    .app {
        text-align: center;
        font-family: Trebuchet MS;
    }
</style>