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
                    <carousel :per-page="carouselItemCountsPerPage" :navigate-to="0" :mouse-drag="false" :autoplay="true" :loop="true"
                              :speed="4000" :autoplayTimeout="8000">
                        <slide v-for="(article, index) in article_list" :key="index">
                            <div class="article-card blue-card" v-bind:class="article_card_color[index]">
                                <h1 class="p-serial-number-text"><b>{{article.articleNumber}}</b></h1>
                                <h1>{{article.name}}</h1>
                            </div>
                        </slide>
                    </carousel>
                </div>
            </div>
            <div class="dashboard-chart-section">
                <div class="left-diagram">
                    <apexchart ref="left_diagram" width="95%" type="bar"
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
                    <apexchart ref="right_diagram" type="line" height="460"
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
                article_card_color: ['blue-card', 'yellow-card', 'green-card'],
                category_month_info: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                diagram_production_data_per_day_options: {
                    colors : ['#277fe2', '#f9681f', '#3fcc45'],
                    chart: {
                        id: 'left_diagram'
                    },
                    xaxis: {
                        categories: []
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
                diagram_production_data_per_day_series: [],

                diagram_quality_data_per_day_options: {
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

                diagram_quality_data_per_day_series: [],
            }
        },
        mounted () {
            this.fetchInfo()
            setInterval(this.calcTime, 1000)
            setInterval(this.clearSelectedDate, 24000) //every 4 min
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
                this.carouselItemCountsPerPage = this.article_list.length > 2 ? 3 : 2
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

