<template>
    <!--<div class="dashboard-background">-->
        <!--<div class="dashboard-content-left">-->
            <!--<div class="article-header">-->
                <!--<h1>Articles in production</h1>-->
            <!--</div>-->

            <!--<div class="article-card blue-card">-->
                <!--<h1 class="p-serial-number-text">80000081C1</h1>-->
                <!--<h1>(5,66 Inch Display Unit [Harman <br> SCON-II])</h1>-->
            <!--</div>-->

            <!--<div class="article-card yellow-card">-->
                <!--<h1 class="p-serial-number-text">80000101A1</h1>-->
                <!--<h1>SCON Assembly (B1)</h1>-->
            <!--</div>-->

            <!--<div class="article-card green-card">-->
                <!--<h1 class="p-serial-number-text">80000114B2</h1>-->
                <!--<h1>10,25 inch Display cluster w/o  <br> coating</h1>-->
            <!--</div>-->
        <!--</div>-->
        <!--<div class="dashboard-content-right">-->
            <!--<div class="date-format">-->
                <!--<h1><b>09.04.2021 14:01</b></h1>-->
                <!--<div class="diagram">-->
                    <!--<apexchart width="600" type="bar" :options="options" :series="series"></apexchart>-->
                    <!--<apexchart width="600" type="bar" :options="options" :series="series"></apexchart>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    <!--</div>-->
    <div class="dashboard-layout">
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1><b>{{dashboard_time}}</b></h1>
            </div>
            <div class="dashboard-carousel-section">
                <div class="carousel-title">
                    <h1>Articles in production</h1>
                </div>
                <div class="carousel-items">
                    <div class="article-card blue-card">
                        <h1 class="p-serial-number-text"><b>80000081C1</b></h1>
                        <h1>(5,66 Inch Display Unit [Harman <br> SCON-II])</h1>
                    </div>
                    <div class="article-card yellow-card">
                        <h1 class="p-serial-number-text"><b>80000101A1</b></h1>
                        <h1>SCON Assembly (B1)</h1>
                    </div>
                    <div class="article-card green-card">
                        <h1 class="p-serial-number-text"><b>80000114B2</b></h1>
                        <h1>10,25 inch Display cluster w/o  <br> coating</h1>
                    </div>
                </div>
            </div>
            <div class="dashboard-chart-section">
                <div class="left-diagram">
                    <apexchart width="95%" type="bar" :options="options" :series="series_left"></apexchart>
                </div>
                <div class="right-diagram">
                    <apexchart type="line" height="460" :options="chartOptions" :series="series_right"></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import VueSlickCarousel from 'vue-slick-carousel'
    import 'vue-slick-carousel/dist/vue-slick-carousel.css'
    // optional style for arrows & dots
    import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'

    export default {
        name: 'dashboard',
        components: {
            VueSlickCarousel
        },
        data () {
            return {
                dashboard_time: '',
                options: {
                    chart: {
                        id: 'vuechart-example'
                    },
                    xaxis: {
                        categories: ['2-Apr', '3-Apr', '4-Apr', '5-Apr', '6-Apr', '7-Apr', '8-Apr', '9-Apr']
                    }
                },
                series_left: [
                    {
                        name: '80000081C1',
                        data: [1, 2, 4, 5, 100, 28, 38, 46]
                    },
                    {
                        name: '80000101A1',
                        data: [200, 29, 37, 36, 44, 45, 50, 29]
                    },
                    {
                        name: '80000114B2',
                        data: [180, 19, 17, 36, 44, 45, 20, 38]
                    },
                ],
                yaxis: [
                    {
                        seriesName: '80000081C1'
                    },
                    {
                        seriesName: '80000114B2'
                    },
                    {
                        seriesName: '80000101A1'
                    }
                ],



                series_right: [{
                    name: 'Income',
                    type: 'column',
                    data: [140, 20, 25, 15, 25, 28, 38, 180]
                }, {
                    name: 'Cashflow',
                    type: 'column',
                    data: [11, 30, 31, 40, 41, 49, 65, 85]
                }, {
                    name: 'Revenue',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }],
                chartOptions: {
                    chart: {
                        height: 450,
                        type: 'line',
                        stacked: false
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: [1, 1, 1, 4]
                    },
                    title: {
                        text: '',
                        align: 'left',
                        offsetX: 110
                    },
                    xaxis: {
                        categories: ['2-Apr', '3-Apr', '4-Apr', '5-Apr', '6-Apr', '7-Apr', '8-Apr', '9-Apr'],
                    },
                    yaxis: [
                        {
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: '#008FFB'
                            },
                            labels: {
                                style: {
                                    colors: '#008FFB',
                                }
                            },
                            title: {
                                text: "",
                                style: {
                                    color: '#008FFB',
                                }
                            },
                            tooltip: {
                                enabled: true
                            }
                        },
                        {
                            seriesName: 'Income',
                            opposite: true,
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: '#00E396'
                            },
                            labels: {
                                style: {
                                    colors: '#00E396',
                                }
                            },
                            title: {
                                text: "",
                                style: {
                                    color: '#00E396',
                                }
                            },
                        },
                        {
                            seriesName: 'Revenue',
                            opposite: true,
                            axisTicks: {
                                show: true,
                            },
                            axisBorder: {
                                show: true,
                                color: '#FEB019'
                            },
                            labels: {
                                style: {
                                    colors: '#FEB019',
                                },
                            },
                            title: {
                                text: "",
                                style: {
                                    color: '#FEB019',
                                }
                            }
                        },
                    ],
                    tooltip: {
                        fixed: {
                            enabled: true,
                            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60
                        },
                    },
                    legend: {
                        horizontalAlign: 'left',
                        offsetX: 40
                    }
                },

            }
        },
        computed: {

        },
        mounted () {
            function showTime() {
                this.dashboard_time = this.calcTime();
            }
            setInterval(showTime.bind(this), 1000);
        },
        methods: {
            calcTime() {
                let d = new Date();
                let yyyy = d.getFullYear();
                let mm = d.getMonth() + 1;
                let dd = d.getDate()
                let hr = d.getHours();
                let min = d.getMinutes();
                let second = d.getSeconds();
                mm = mm < 10 ? ('0' + mm) : mm;
                dd = dd < 10 ? ('0' + dd) : dd;
                hr = hr < 10 ? ('0' + hr) : hr;
                min = min < 10 ? ('0' + min) : min;
                second = second < 10 ? ('0' + second) : second;
                return dd + '.' + mm + '.' + yyyy + '  ' + hr + ':' + min + ':' + second;
            }
        }
    }
</script>
<style>
 .dashboard-header {
     width: 100%;
     height: 100px;
     background: white;
     display: flex;
     justify-content: space-between;
     padding: 30px;
 }
 .header-text {
     font-size: 30px;
     font-weight: 600;
 }

</style>
