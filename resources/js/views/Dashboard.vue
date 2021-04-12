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
                    <carousel :per-page="3" :navigate-to="0" :mouse-drag="false" :autoplay="true" :loop="true"
                              :speed="4000" :autoplayTimeout="8000" :autoplayDirection="forward">
                        <slide v-for="(article, index) in article_list" :key="'player-list-'+index">
                            <div class="article-card blue-card" v-bind:class="article_card_color[index]">
                                <h1 class="p-serial-number-text"><b>{{article.st_article_nr}}</b></h1>
                                <h1>(5,66 Inch Display Unit [Harman <br> SCON-II])</h1>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
            <div class="dashboard-chart-section">
                <div class="left-diagram">
                    <apexchart ref="left_diagram" width="95%" type="bar" :options="first_diagram_options" :series="series_left"></apexchart>
                </div>
                <div class="right-diagram">
                    <apexchart ref="right_diagram" type="line" height="460" :options="second_diagram_options" :series="series_right"></apexchart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel'

    export default {
        name: 'dashboard',
        components: {
            Carousel,
            Slide
        },
        data () {
            return {
                autoPlay: true,
                dashboard_time: '',
                article_list: [],
                first_diagram_datas: [],
                second_diagram_datas: [],
                article_card_color: ['blue-card', 'yellow-card', 'green-card'],
                category_month_info: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                first_diagram_options: {
                    colors : ['#277fe2', '#f9681f', '#3fcc45'],
                    chart: {
                        id: 'left_diagram'
                    },
                    xaxis: {
                        categories: ['2-Apr', '3-Apr', '4-Apr', '5-Apr', '6-Apr', '7-Apr', '8-Apr', '9-Apr']
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                position: 'top',
                                maxItems: 100,
                                hideOverflowingLabels: true,
                                orientation: 'horizontal'
                            }
                        }
                    }
                },
                series_left: [
                    {
                        name: '80000081C1',
                        data: []
                    },
                    {
                        name: '80000101A1',
                        data: []
                    },
                    {
                        name: '80000114B2',
                        data: []
                    },
                ],

                series_right: [{
                    name: 'In Production',
                    type: 'column',
                    data: []
                }, {
                    name: 'Failed',
                    type: 'column',
                    data: []
                }, {
                    name: 'OK',
                    type: 'column',
                    data: []
                }, {
                    name: 'Rate/hr',
                    type: 'line',
                    data: []
                }],

                second_diagram_options: {
                    colors : ['#f9681f', '#867f7b', '#f3ae0d', '#3f4590'],
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
                        width: [1, 1, 1, 2]
                    },
                    title: {
                        text: '',
                        align: 'left',
                        offsetX: 110
                    },
                    xaxis: {
                        categories: [],
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
                                color: '#f9681f'
                            },
                            labels: {
                                style: {
                                    colors: '#f9681f',
                                }
                            },
                            title: {
                                text: "",
                                style: {
                                    color: '#f9681f',
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
                                color: '#867f7b'
                            },
                            labels: {
                                style: {
                                    colors: '#867f7b',
                                },
                            },
                            title: {
                                text: "",
                                style: {
                                    color: '#867f7b',
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
            setInterval(this.fetchInfo, 24000)
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
                    this.first_diagram_options.xaxis.categories = []
                    this.first_diagram_options.xaxis.categories = this.getCategories(r.data.categories)
                    this.second_diagram_options.xaxis.categories = []
                    this.second_diagram_options.xaxis.categories = this.getCategories(r.data.categories)
                    this.$refs.left_diagram.updateOptions(this.first_diagram_options);
                    this.$refs.right_diagram.updateOptions(this.second_diagram_options);
                    this.series_left = []
                    this.yaxis = []
                    this.series_left = r.data.first_diagram_datas
                    this.series_right = r.data.second_diagram_datas
                    let infoMessage = `fetched the updated data successfully.`
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
                for(let i = 0; i < paramCategories.length; i++) {
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

