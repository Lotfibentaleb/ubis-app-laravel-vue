<template>
  <section>
    <card-component title="Komponente" class="has-mobile-sort-spaced" icon="view-grid">
      <div class="level">
        <div class="level-left">
          <h5 class="title is-5">
            {{componentdata.articleNumber}} - {{componentdata.name}}
          </h5>
        </div>
        <div class="level-right">
          <b-field label="Serial number" label-position="on-border">
            <b-input :value="serial" size="is-medium" @change.native="serial = $event.target.value"/>
             <p class="control">
                <b-button v-bind:type="save_button_type" label="Save" size="is-medium" v-bind:outlined="save_button_outlined"/>
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
    id: {
      default: null
    },
    componentdata: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      serial: null,
      isLoading: false,
      item: null,
      form: null,
      createdReadable: null,
      save_button_type: "is-success",
      save_button_outlined: false
    }
  },
  computed: {
  },
  created () {
  },
  methods: {
    getData () {
      if (this.id) {
        axios
          .get(`/clients/${this.id}`)
          .then(r => {
            this.form = r.data.data
            this.item = clone(r.data.data)

            this.form.created_date = new Date(r.data.data.created_mm_dd_yyyy)
          })
          .catch(e => {
            this.item = null

            this.$buefy.toast.open({
              message: `Error: ${e.message}`,
              type: 'is-danger',
              queue: false
            })
          })
      }
    },
    submit () {
      this.isLoading = true
      let method = 'post'
      let url = '/clients/store'

      if (this.id) {
        method = 'patch'
        url = `/clients/${this.id}`
      }

      axios({
        method,
        url,
        data: this.form
      }).then(r => {
        this.isLoading = false

        if (!this.id && r.data.data.id) {
          this.$router.push({name: 'clients.edit', params: {id: r.data.data.id}})

          this.$buefy.snackbar.open({
            message: 'Created',
            queue: false
          })
        } else {
          this.item = r.data.data

          this.$buefy.snackbar.open({
            message: 'Updated',
            queue: false
          })
        }
      }).catch(e => {
        this.isLoading = false

        this.$buefy.toast.open({
          message: `Error: ${e.message}`,
          type: 'is-danger',
          queue: false
        })
      })
    }
  },
  watch: {
    serial : function() {
      console.log(this.serial)
      this.save_button_outlined = true
//      this.save_button_type = "is-light"
    }
  }
}
</script>
