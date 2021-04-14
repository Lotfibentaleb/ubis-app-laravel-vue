<template>
    <div class="dashboard-layout">
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1><b>UBIS - Production Dashboard</b></h1>
                <h1><b>{{dashboard_time}}</b></h1>
            </div>
            <div class="dashboard-carousel-section">
                <div class="carousel-title">
                    <h1><b>Articles in production last 10 days</b></h1>
                </div>
                <div class="carousel-items">
                    <carousel :per-page="carouselItemCountsPerPage" :navigate-to="0" :mouse-drag="false" :autoplay="true" :loop="true"
                              :speed="4000" :autoplayTimeout="8000">
                        <slide v-for="(article, index) in article_list" :key="index">
                            <div class="article-card blue-card" v-bind:class="article_card_color[index % 10]">
                                <h1 class="p-serial-number-text"><b>{{article.articleNumber}}</b></h1>
                                <h1>{{article.name}}</h1>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
            <div class="dashboard-chart-section">
                <div class="left-diagram">
                    <apexchart ref="left_diagram" width="100%" height="460" type="bar"
                               :options="diagram_production_data_per_day_options"
                               :series="diagram_production_data_per_day_series">
                    </apexchart>
                </div>
                <div class="date-picker">
                    <b-datepicker
                        placeholder="Type or select a date..."
                        icon="calendar-today"
                        :min-date="minDate"
                        :max-date="maxDate"
                        v-model="selectedDate"
                        editable>
                    </b-datepicker>
                </div>
                <div class="right-diagram">
                    <apexchart ref="right_diagram" type="line" width="100%" height="465"
                               :options="diagram_quality_data_per_day_options"
                               :series="diagram_quality_data_per_day_series">
                    </apexchart>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel'
    import BDatepicker from "buefy/src/components/datepicker/Datepicker";

    export default {
        name: 'dashboard',
        components: {
            BDatepicker,
            Carousel,
            Slide
        },
        data () {
            const today = new Date()
            return {
                date: new Date(),
                minDate: new Date(today.getFullYear() - 80, today.getMonth(), today.getDate()),
                maxDate: new Date(today.getFullYear() + 18, today.getMonth(), today.getDate()),
                selectedDate: null,
                isShowDatePicker: false,
                carouselItemCountsPerPage: 2,
                autoPlay: true,
                dashboard_time: '',
                article_list: [],
                article_card_color: ['card-one', 'card-two', 'card-three', 'card-four', 'card-five', 'card-six',
                    'card-seven', 'card-eight', 'card-nine', 'card-ten'],
                category_month_info: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct',
                    'Nov', 'Dec'],
                diagram_production_data_per_day_options: {
                    colors : ['#1257a5', '#b34711', '#229627', '#8a057e', '#312725', '#2d0c77', '#8a0404',
                        '#0d6667', '#23567b', '#045361'],
                    chart: {
                        id: 'left_diagram'
                    },
                    xaxis: {
                        categories: []
                    },
                    yaxis: [
                        {
                            labels: {
                                style: {
                                    colors: '#333333',
                                    fontSize: '16'
                                }
                            },
                            axisBorder: {
                                show: true,
                            }
                        }
                    ],
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                position: 'top'
                            }
                        }
                    },
                    dataLabels: {
                        enabled: true,
                        style: {
                            colors: ['#474D52'],
                            fontSize: '15'
                        },
                        offsetY: -30,
                        formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                            if(value == 0) {
                                return ''
                            } else {
                                return value
                            }
                        }
                    },
                    tooltip: {
                        fixed: {
                            enabled: true,
                            position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                            offsetY: 30,
                            offsetX: 60
                        },
                    }
                },
                diagram_production_data_per_day_series: [],

                diagram_quality_data_per_day_options: {
                    colors : ['#f9681f', '#229627', '#867f7b', '#3f4590', '#a717bf'],
                    chart: {
                        height: 465,
                        type: 'line',
                        stacked: false,
                        id: 'right_diagram'
                    },
                    dataLabels: {
                        enabled: false
                    },
                    stroke: {
                        width: [1, 1, 1, 1, 4],
                        curve: 'smooth'
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
                            seriesName: 'Registered',
                            axisTicks: {
                                show: true
                            },
                            axisBorder: {
                                show: true,
                            },
                            labels: {
                                style: {
                                    colors: '#333333',
                                    fontSize: '16'
                                },
                                // formatter: (value, index) => this.labelFormatter(value, index)
                            },
                            tickAmount: 8,
                        },{
                            seriesName: 'Registered',
                            show: false
                        },{
                            seriesName: 'Registered',
                            show: false
                        },{
                            seriesName: 'Registered',
                            show: false
                        },{
                            opposite: true,
                            seriesName: 'Rate/hr',
                            show: true,
                            axisTicks: {
                                show: true,
                                style: {
                                    colors: '#a717bf',
                                }
                            },
                            axisBorder: {
                                show: true,
                                style: {
                                    colors: '#a717bf',
                                }
                            },
                            labels: {
                                style: {
                                    colors: '#a717bf',
                                    fontSize: '16'
                                },
                                // formatter: (value) => this.labelFormatter(value)
                            },
                            title: {
                                text: 'Rate/hr',
                                style: {
                                    fontSize: '14',
                                    color: '#a717bf'
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

                diagram_quality_data_per_day_series: [],
            }
        },
        mounted () {
            this.fetchInfo()
            setInterval(this.calcTime, 1000)
            setInterval(this.clearSelectedDate, 180000) //every 3 min
        },
        methods: {
            clearSelectedDate() {
                this.selectedDate = null
                this.fetchInfo()
            },
            fetchInfo() {
                let method = 'get'
                let url = ''
                url = this.selectedDate ? `/dashboardInfo?selectedDate=${this.getParamDate(this.selectedDate)}` : `/dashboardInfo`
                axios({
                    method,
                    url
                }).then( r => {
                    this.article_list = r.data.articles_produced_within_timespan
                    this.calcCarouselItemsPerPage()
                    this.diagram_production_data_per_day_options.xaxis.categories = []
                    this.diagram_production_data_per_day_options.xaxis.categories = this.getCategories(r.data.timeseries)
                    this.diagram_quality_data_per_day_options.xaxis.categories = []
                    this.diagram_quality_data_per_day_options.xaxis.categories = this.getCategories(r.data.timeseries)
                    this.$refs.left_diagram.updateOptions(this.diagram_production_data_per_day_options);
                    this.$refs.right_diagram.updateOptions(this.diagram_quality_data_per_day_options);
                    this.series_left = []
                    this.yaxis = []
                    this.diagram_production_data_per_day_series = r.data.diagram_production_data_per_day
                    this.diagram_quality_data_per_day_series = r.data.diagram_quality_data_per_day
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
            calcCarouselItemsPerPage() {
                this.carouselItemCountsPerPage = this.article_list.length > 2 ? 3 : this.article_list.length
            },
            labelFormatter(value, index) {
                if(index != 0) {
                    return 5 * (2 ** (index-1))
                } else {
                    return 0;
                }
            },
            getParamDate(strDate) {
                let d = new Date(strDate);
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
                return yyyy + '-' + mm + '-' + dd
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
                this.dashboard_time = dd + '.' + mm + '.' + yyyy + '  ' + hr + ':' + min + ':' + second;
            }
        },
        computed: {

        },
        watch:{
            selectedDate:function(){
                this.fetchInfo();
            }
        }
    }
</script>

