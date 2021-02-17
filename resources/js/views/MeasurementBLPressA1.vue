<template>
    <div>
      <div class="level">
        <div class="level-left">
          <h5 class="title is-5">
            Left
          </h5>
        </div>
        <div class="level-right">
          Right
        </div>
      </div>
      <div>
        <b-table
        :hoverable="true"
        :data="values"
        :row-class="(row, index) => row.result === 'nok' && 'is-nok'">
        >
        <template slot-scope="props">
          <b-table-column label="Name" field="title" >
            {{ props.row.title }}
          </b-table-column>
          <b-table-column label="Min" field="min" >
            {{ props.row.min }}{{ props.row.unit }}
          </b-table-column>
          <b-table-column label="Nominal" field="nominal" >
            {{ props.row.nominal }}{{ props.row.unit }}
          </b-table-column>
          <b-table-column label="Measure" field="measurement" >
            {{ props.row.measurement }}{{ props.row.unit }}
          </b-table-column>
          <b-table-column label="Max" field="max" >
            {{ props.row.max }}{{ props.row.unit }}
          </b-table-column>
          <b-table-column label="Result" field="result" >
            {{ props.row.result }}
          </b-table-column>

        </template>
        </b-table>
      </div>
      <div>
      <div v-if="defaultChart.chartData" class="chart-area">
        <line-chart style="height: 100%"
                    ref="bigChart"
                    chart-id="big-line-chart"
                    :chart-data="defaultChart.chartData"
                    :extra-options="defaultChart.extraOptions">
        </line-chart>

      </div>
      </div>
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'
import * as chartConfig from '@/components/Charts/chart.config'
import LineChart from '@/components/Charts/LineChart'


export default {
  name: 'MeasurementBLPressA1',
  components: { CardComponent, LineChart },
  props: {
    dataentryid: { required: true },
    dataentrystepname: { required: true },
    productid: { default: null },         // ID of parent product, if given
    productioninformation: { type: Object},
    dataUrl: { required: true }
  },
  data () {
    return {
      isLoading: false,
      values: [{
        name:'Mura',
        st_article_nr:'faffaf',
        st_serial_nr:'fsfsfs',
        lifecycle:5
      },
      {
        name:'Mura2',
        st_article_nr:'faffdgfvmnbmaf',
        st_serial_nr:'fs2525',
        lifecycle:'gdgd'
      }],
      defaultChart: {
        extraOptions: {
          maintainAspectRatio: false,
          legend: {
            display: true
          },
          responsive: true,
          tooltips: {
            backgroundColor: '#f5f5f5',
            titleFontColor: '#333',
            bodyFontColor: '#666',
            bodySpacing: 10,
            xPadding: 12,
            mode: 'nearest',
            intersect: 0,
            position: 'nearest'
          },
          scales: {
            yAxes: [{
              id: 'left-y-axis',
              position: 'left',
              type: 'linear',
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(29,140,248,0.0)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                padding: 10,
                fontColor: '#9a9a9a',
                min: -50,
                max: 800
              }
            },
            {
              id: 'right-y-axis',
              position: 'right',
              type: 'linear',
              barPercentage: 1.6,
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
              ticks: {
                padding: 10,
                fontColor: '#9a9a9a',
                min: 0,
                max: 5
              }
            }],
            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(225,78,202,0.1)',
                zeroLineColor: 'transparent'
              },
              ticks: {
                padding: 20,
                fontColor: '#9a9a9a'
              }
            }]
          }
        },
        chartData1: {
          datasets: [
            {
              label: 'force',
              fill: false,
              borderColor: 'rgb(33, 72, 245)',
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0,
              pointBackgroundColor: 'rgb(33, 72, 245)',
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: 'rgb(33, 72, 245)',
              pointBorderWidth: 20,
              pointHoverRadius: 5,
              pointHoverBorderWidth: 15,
              pointRadius: 3,
              yAxisID: 'left-y-axis',
              data: [
                  4.147378361025204,
                  4.147378361025204,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.0297493407353215,
                  4.24887754580439,
                  4.24887754580439,
                  4.24887754580439,
                  4.24887754580439,
                  4.24887754580439,
                  4.24887754580439,
                  4.24887754580439,
                  3.9712205886154095,
                  3.9712205886154095,
                  3.9712205886154095,
                  3.9712205886154095,
                  3.9712205886154095

              ]
            },
            {
                    "label": "pressure",
                    "fill": false,
                    "borderColor": "rgb(245, 128, 33)",
                    "borderWidth": 2,
                    "borderDash": [],
                    "borderDashOffset": 0,
                    "pointBackgroundColor": "rgb(245, 128, 33)",
                    "pointBorderColor": "rgba(255,255,255,0)",
                    "pointHoverBackgroundColor": "rgb(245, 128, 33)",
                    "pointBorderWidth": 20,
                    "pointHoverRadius": 5,
                    "pointHoverBorderWidth": 15,
                    "pointRadius": 3,
                    "yAxisID": "right-y-axis",
                    "data": [
                        2.298437835413629,
                        2.298437835413629,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.2984011298143296,
                        2.074803281808125,
                        2.074803281808125,
                        2.074803281808125,
                        2.074803281808125,
                        2.074803281808125,
                        2.074803281808125,
                        2.074803281808125,
                        0.8259350778857839,
                        0.8259350778857839,
                        0.8259350778857839,
                        0.8259350778857839,
                        0.8259350778857839
                    ]

              /*
              label: 'force2',
              fill: false,
              borderColor: chartConfig.chartColors.default.info,
              borderWidth: 2,
              borderDash: [],
              borderDashOffset: 0.0,
              pointBackgroundColor: chartConfig.chartColors.default.info,
              pointBorderColor: 'rgba(255,255,255,0)',
              pointHoverBackgroundColor: chartConfig.chartColors.default.info,
              pointBorderWidth: 20,
              pointHoverRadius: 4,
              pointHoverBorderWidth: 15,
              pointRadius: 4,
              yAxisID: 'right-y-axis',
              data: this.randomChartData(9)
              */
            },
          ],
//          labels: ['0', '15', '31', '46', '62', '78', '93', '109', '124', '140', '156']
            "labels": [
                0,
                15,
                31,
                46,
                62,
                78,
                93,
                109,
                124,
                140,
                156,
                171,
                187,
                203,
                218,
                234,
                249,
                265,
                281,
                296,
                312
            ]

        },
      },
    }
  },
  computed: {
  },
  mounted () {
    this.getData()
  },
  created () {
      console.log('Measurement created');

  },
  methods: {
    randomChartData (n) {
      let data = []
      for (let i = 0; i < n; i++) {
        data.push(Math.round(Math.random() * 2))
      }
      return data
    },
    getData () {
      if (this.dataUrl) {
        this.isLoading = true
        axios.create({
           headers: {
            'Content-Type': 'application/json',
        }
        })
          .get(this.dataUrl+'/product/'+this.productid+'/productiondatabacklight/'+this.productioninformation.production_section_template.id)
          .then(r => {
            console.log(r);
            /*
{
    "data": {
        "gamma": 0,
        "ambient_temp": 0,
        "heating_temp": 0,
        "saturation_red": 0.9198821367229668,
        "wavelength_red": 620,
        "luminance_black": 1.2980340255024032,
        "luminance_white": 1248.0858827623174,
        "saturation_blue": 0.915708555229935,
        "wavelength_blue": 467,
        "saturation_green": 0.9037560064233375,
        "wavelength_green": 548,
        "homogeneity_black": 40,
        "homogeneity_white": 86,
        "chromatisity_white_x": 0.32703114572850656,
        "chromatisity_white_y": 0.3438924966399338,
        "contrast_white_black": 0
    }
}
TODO: mixin reference values and show values green/red. Use Table
            */
            this.isLoading = false
            if (r.data && r.data.data) {
              this.values = r.data.data.table
              this.defaultChart.chartData = r.data.data.chart
            }
          })
          .catch( err => {
            this.isLoading = false
            this.$buefy.toast.open({
              message: `Error: ${err.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
  },
  watch: {
  }
}
</script>

<style>
    tr.is-nok {
        background: #d68a8a;
        color: rgb(0, 0, 0);
    }
    tr {
        background: #8ad68e;
        color: rgb(0, 0, 0);
    }

</style>
