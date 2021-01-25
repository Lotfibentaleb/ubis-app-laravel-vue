<template>
  <section>
    <card-component title="Komponente" class="has-mobile-sort-spaced" icon="view-grid">
      <div class="level">
        <div class="level-left">
          <h5 class="title is-5">
            {{componentarticledata.articleNumber}} - {{componentarticledata.name}}
          </h5>
        </div>
        <div class="level-right">
          <b-field label="Serial number" label-position="on-border">
            <b-input :value="component_serial" size="is-medium" @change.native="component_serial = $event.target.value" :disabled="component_id != null"/>
             <p class="control">
                <b-button v-show="component_id == null" type="is-success" label="Save" size="is-medium"/>
                <b-button v-show="component_id != null" @click="submitComponent(true)" type="is-dark" label="Delete" size="is-medium"/>
            </p>
          </b-field>
        </div>
      </div>
    </card-component>
    </section>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  name: 'SubComponent',
  components: { CardComponent },
  props: {
    id: { default: null },
    componentarticledata: { type: Object, required: true },
    articledata: { type: Object, required: true },
    productid: { default: null },
    productserial: { default: null },
    component_serial:{ default: null },
    component_id:{ default: null }
  },
  data () {
    return {
      transmissionActive: false,
//      component_serial: null,
//      component_id: null
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    // Emit product and serial nr to parent on creation
    productUpdate: function(productSerial, productId) {
      this.$emit('productUpdate', productId, productSerial)
    },
    submitComponent: function(deleteComponent = false) {
      this.transmissionActive = true
      let method = 'post'
      let url = `/registration/product/${this.productid}/articleNr/${this.articledata.articleNumber}`
      let data = {
        component_article_nr: `${this.componentarticledata.articleNumber}`,
        component_serial_nr: `${this.component_serial}`,
      }
      if( deleteComponent ){
        method = 'delete'
        // 'products/{id}/components/{componentId}
        url = `/registration/product/${this.productid}/components/${this.component_id}`
      }

      axios({
        method,
        url,
        data
      }).then( r => {
        r = r.data.data
        console.log(r)
        let infoMessage = `Component stored`
        if( deleteComponent ){
          infoMessage = `Component removed`
          this.component_id = null
          this.component_serial = null
        }else{
          this.productUpdate(r.product_serial, r.product_id)
          this.component_id = r.component_id
        }
        this.$buefy.snackbar.open({
          message: infoMessage,
          queue: false
        })
      }).catch( err => {
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      }).finally(() => {
        this.transmissionActive = false
      })
    }
  },
  watch: {
    component_serial : function() {
      if( !this.transmissionActive )  // mutal exclusive sending
        this.submitComponent(false);
    }
  }
}
</script>
