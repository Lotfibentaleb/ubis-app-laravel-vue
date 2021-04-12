<template>
    <div class="dashboard-layout">
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1><b>UBIS - Production Dashboard</b></h1>
                <h1><b>{{dashboard_time}}</b></h1>
            </div>
            <div class="dashboard-carousel-section">
                <div class="carousel-title">
                    <h1><b>Articles in production</b></h1>
                </div>
                <div class="carousel-items">
                    <div v-for="(article, index) in article_list" class="article-card blue-card" v-bind:class="article_card_color[index]">
                        <h1 class="p-serial-number-text"><b>{{article.st_article_nr}}</b></h1>
                        <!--<h1>(5,66 Inch Display Unit [Harman <br> SCON-II])</h1>-->
                    </div>
                    <!--<div class="article-card blue-card">-->
                        <!--<h1 class="p-serial-number-text"><b>80000081C1</b></h1>-->
                        <!--<h1>(5,66 Inch Display Unit [Harman <br> SCON-II])</h1>-->
                    <!--</div>-->
                    <!--<div class="article-card yellow-card">-->
                        <!--<h1 class="p-serial-number-text"><b>80000101A1</b></h1>-->
                        <!--<h1>SCON Assembly (B1)</h1>-->
                    <!--</div>-->
                    <!--<div class="article-card green-card">-->
                        <!--<h1 class="p-serial-number-text"><b>80000114B2</b></h1>-->
                        <!--<h1>10,25 inch Display cluster w/o  <br> coating</h1>-->
                    <!--</div>-->
                </div>
            </div>
            <div class="dashboard-chart-section">
                <div class="left-diagram">
                    <apexchart ref="left_diagram" width="95%" type="bar" :options="options" :series="series_left"></apexchart>
                </div>
                <div class="right-diagram">
                    <apexchart ref="right_diagram" type="line" height="460" :options="chartOptions" :series="series_right"></apexchart>
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
                article_list: [],
                first_diagram_datas: [],
                second_diagram_datas: [],
                article_card_color: ['blue-card', 'yellow-card', 'green-card'],
                category_month_info: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                options: {
                    chart: {
                        id: 'left_diagram'
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
                    name: 'In Production',
                    type: 'column',
                    data: [140, 20, 25, 15, 25, 28, 38, 180]
                }, {
                    name: 'Failed',
                    type: 'column',
                    data: [11, 30, 31, 40, 41, 49, 65, 85]
                }, {
                    name: 'OK',
                    type: 'column',
                    data: [11, 30, 31, 40, 41, 49, 65, 85]
                }, {
                    name: 'Rate/hr',
                    type: 'line',
                    data: [20, 29, 37, 36, 44, 45, 50, 58]
                }],
                chartOptions: {
                    chart: {
                        height: 450,
                        type: 'line',
                        stacked: false,
                        id: 'right_diagram'
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
                            seriesName: 'In Production',
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
                            seriesName: 'Failed',
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
            this.fetchInfo()
            function showTime() {
                this.dashboard_time = this.calcTime()
            }
            setInterval(showTime.bind(this), 1000)
        },
        methods: {
            fetchInfo() {
                // var chart = new ApexCharts(document.querySelector("#left_diagram"), options);
                let method = 'get'
                let url = `/dashboardInfo`
                axios({
                    method,
                    url
                }).then( r => {
                    this.article_list = r.data.article_list
                    this.first_diagram_datas = r.data.first_diagram_datas
                    this.second_diagram_datas = r.data.second_diagram_datas
                    this.options.xaxis.categories = []
                    this.options.xaxis.categories = this.getCategories(r.data.categories)
                    this.chartOptions.xaxis.categories = []
                    this.chartOptions.xaxis.categories = this.getCategories(r.data.categories)
                    this.$refs.left_diagram.updateOptions(this.options);
                    this.$refs.right_diagram.updateOptions(this.options);
                    this.series_left = []
                    this.yaxis = []
                    for(let i = 0; i<this.article_list.length; i++){
                        const series_left_item = {
                            'name': this.article_list[i].st_article_nr,
                            'data': [1, 2, 3, 4, 5, 6, 7, 8]
                        }
                        const yaxis_item = {
                            'seriesName': this.article_list[i].st_article_nr
                        }
                        this.series_left.push(series_left_item);
                        this.yaxis.push[yaxis_item];
                    }
                    this.series_right = r.data.second_diagram_datas
                    let infoMessage = `fetching data successfully`
                    this.$buefy.snackbar.open({
                        message: infoMessage,
                        queue: false
                    })
                }).catch( err => {
                    let message = `fetching data fail`
                    console.log(err.response)
                    this.$buefy.toast.open({
                        message: message,
                        type: 'is-danger',
                        queue: false
                    })
                }).finally(() => {

                })
            },
            getCategories(paramCategories) {
                let resCategories = []
                for(let i = paramCategories.length - 1; i >= 0; i--) {
                    resCategories.push(paramCategories[i].split('-')[2] + '-' + this.category_month_info[paramCategories[i].split('-')[1] - 1])
                }
                return resCategories
            },
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

