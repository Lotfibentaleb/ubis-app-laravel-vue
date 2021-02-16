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
    </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'MeasurementDaisyA1',
  components: { CardComponent },
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
    }
  },
  computed: {
  },
  created () {
      console.log('Measurement created');
      this.getData()
  },
  methods: {
    getData () {
      if (this.dataUrl) {
        this.isLoading = true
        axios.create({
           headers: {
            'Content-Type': 'application/json',
        }
        })
          .get(this.dataUrl+'/product/'+this.productid+'/productiondatadaisy/'+this.productioninformation.production_section_template.id)
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
              this.values = r.data.data
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
